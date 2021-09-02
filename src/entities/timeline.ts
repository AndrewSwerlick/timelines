import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Timeline, Moment, BranchPoint } from "./data";
import type { RootState } from "../app/store";

const timelineAdapter = createEntityAdapter<Timeline>();
const momentAdapter = createEntityAdapter<Moment>();
const branchPointAdapter = createEntityAdapter<BranchPoint>();

interface BranchTimelineAction {
  newTimelineId: string;
  source: Timeline;
  branchingMoment: Moment;
}

interface AddMomentAction {
  momentId: string;
  timelineId: string;
}

export const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: timelineAdapter.getInitialState(),
    moments: momentAdapter.getInitialState(),
    branchPoints: branchPointAdapter.getInitialState(),
  },
  reducers: {
    branchTimeline(state, action: PayloadAction<BranchTimelineAction>) {
      // copy all moment ids up to the branchingMoment
      const source = action.payload.source;
      const branchingMoment = action.payload.branchingMoment;
      const branchPointId = branchingMoment.branchPointId || branchingMoment.id;
      const newMoment = {
        id: uuidv4(),
        branchPointId,
      };
      momentAdapter.addOne(state.moments, newMoment);
      momentAdapter.updateOne(state.moments, {
        id: branchingMoment.id,
        changes: { branchPointId: branchPointId },
      });
      const timeline = {
        id: action.payload.newTimelineId || uuidv4(),
        momentIds: _.takeWhile(
          source.momentIds,
          (id) => id !== branchingMoment.id
        ).concat([newMoment.id]),
      };
      timelineAdapter.addOne(state.timelines, timeline);
      let branchPoint = state.branchPoints.entities[branchPointId];
      if (branchPoint) {
        branchPointAdapter.updateOne(state.branchPoints, {
          id: branchPointId,
          changes: {
            branches: branchPoint.branches.concat([
              {
                timelineId: timeline.id,
                momentId: newMoment.id,
              },
            ]),
          },
        });
      } else {
        branchPointAdapter.addOne(state.branchPoints, {
          id: branchPointId,
          sourceTimelineId: source.id,
          branches: [
            { timelineId: source.id, momentId: branchingMoment.id },
            { timelineId: timeline.id, momentId: newMoment.id },
          ],
        });
      }
    },
    createNewTimeline(state, action: PayloadAction<{ id: string }>) {
      const timeline = {
        id: action.payload.id || uuidv4(),
        momentIds: [],
      };
      timelineAdapter.addOne(state.timelines, timeline);
    },
    addMoment(state, action: PayloadAction<AddMomentAction>) {
      momentAdapter.addOne(state.moments, {
        id: action.payload.momentId,
        timelineId: action.payload.timelineId,
      });
      const { timelineId } = action.payload;
      const newMoments = [
        ...(state.timelines.entities[timelineId]?.momentIds || []),
      ];
      newMoments.push(action.payload.momentId);
      timelineAdapter.updateOne(state.timelines, {
        id: action.payload.timelineId,
        changes: { momentIds: newMoments },
      });
    },
  },
});

export const {
  createNewTimeline,
  branchTimeline,
  addMoment,
} = timelineSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getBranchPointsByTimelineId = (state: RootState) => {
  const byTimelineId: { [index: string]: BranchPoint[] } = {};
  Object.values(state.branchPoints.entities).forEach((branchPoint) => {
    branchPoint?.branches.forEach((branch) => {
      const branches = byTimelineId[branch.timelineId] || [];
      branches.push(branchPoint);
      byTimelineId[branch.timelineId] = branches;
    });
  });

  return byTimelineId;
};

export default timelineSlice.reducer;
