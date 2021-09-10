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
  branchingMoment: Moment;
}

interface AddMomentAction {
  momentId: string;
  timelineId: string;
  title: string;
}

interface EditMomentAction {
  momentId: string;
  title: string;
  narrative: string;
}

export const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: timelineAdapter.getInitialState(),
    moments: momentAdapter.getInitialState(),
    branchPoints: branchPointAdapter.getInitialState(),
    ui: {},
  },
  reducers: {
    branchTimeline(state, action: PayloadAction<BranchTimelineAction>) {
      const branchingMoment = action.payload.branchingMoment;
      const branchPointId = branchingMoment.branchPointId || branchingMoment.id;
      const source = state.timelines.entities[branchingMoment.timelineId]!;
      const newBranchMomentPartial = {
        id: uuidv4(),
        branchPointId,
      };
      const newMomentPartial = {
        id: uuidv4(),
      };

      momentAdapter.updateOne(state.moments, {
        id: branchingMoment.id,
        changes: { branchPointId: branchPointId },
      });
      const timeline = {
        id: action.payload.newTimelineId || uuidv4(),
        momentIds: _.takeWhile(
          source.momentIds,
          (id) => id !== branchingMoment.id
        ).concat([newBranchMomentPartial.id, newMomentPartial.id]),
      };
      timelineAdapter.addOne(state.timelines, timeline);
      const newBranchMoment = {
        ...newBranchMomentPartial,
        timelineId: timeline.id,
      };
      const newMoment = {
        ...newMomentPartial,
        timelineId: timeline.id,
      };
      momentAdapter.addMany(state.moments, [newBranchMoment, newMoment]);

      let branchPoint = state.branchPoints.entities[branchPointId];
      if (branchPoint) {
        branchPointAdapter.updateOne(state.branchPoints, {
          id: branchPointId,
          changes: {
            branches: branchPoint.branches.concat([
              {
                timelineId: timeline.id,
                momentId: newBranchMoment.id,
              },
            ]),
          },
        });
      } else {
        branchPointAdapter.addOne(state.branchPoints, {
          id: branchPointId,
          sourceTimelineId: branchingMoment.timelineId,
          branches: [
            {
              timelineId: branchingMoment.timelineId,
              momentId: branchingMoment.id,
            },
            { timelineId: timeline.id, momentId: newBranchMoment.id },
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
        title: action.payload.title,
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
    editMoment: (state, action: PayloadAction<EditMomentAction>) => {
      const { title, narrative, momentId } = action.payload;
      momentAdapter.updateOne(state.moments, {
        id: momentId,
        changes: { title, narrative },
      });
    },
  },
});

export const {
  createNewTimeline,
  branchTimeline,
  addMoment,
  editMoment,
} = timelineSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getBranchPointsByTimelineId = (state: RootState) => {
  const byTimelineId: { [index: string]: BranchPoint[] } = {};
  Object.values(state.branchPoints.entities).forEach((branchPoint) => {
    if (branchPoint) {
      const branches = byTimelineId[branchPoint.sourceTimelineId] || [];
      branches.push(branchPoint);
      byTimelineId[branchPoint.sourceTimelineId] = branches;
    }
  });

  return byTimelineId;
};

export const getCurrentTimeline = (state: RootState) => {
  if (state.ui.currentTimelineId) {
    return state.timelines.entities[state.ui.currentTimelineId];
  } else if (state.timelines.ids.length > 0) {
    return state.timelines.entities[state.timelines.ids[0]];
  }
};

export default timelineSlice.reducer;
