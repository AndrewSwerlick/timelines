import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useTimeboardLayout } from "./hooks";
import {
  branchTimeline,
  createNewTimeline,
  addMoment,
} from "../../entities/timeline";
import { ChapterSquare } from "../../components/ChapterSquare";
import { Arrow } from "../../components/graphics/Arrow";
import { getMockTitle } from "../../entities/mocks";

export const TimeBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const timelines = useAppSelector((state) => state.timelines);
  const moments = useAppSelector((state) => state.moments);

  const sourceTimeline = Object.values(timelines.entities)[0];
  const branchingMoment = useAppSelector((state) => {
    if (sourceTimeline) {
      return state.moments.entities[sourceTimeline?.momentIds[3]];
    }
  });
  const layout = useTimeboardLayout({
    momentSize: 120,
    horizontalSpacing: 120,
    verticalSpacing: 120,
  });

  function setupTimeline() {
    const timelineId = uuidv4();
    dispatch(createNewTimeline({ id: timelineId }));
    [...Array(5)].forEach((_, index) => {
      const momentId = uuidv4();
      setTimeout(() => {
        console.log("adding");
        dispatch(addMoment({ timelineId, momentId, title: getMockTitle() }));
      }, index * 500);
    });
  }

  useEffect(() => {
    setupTimeline();
  }, []);

  useEffect(() => {
    if (sourceTimeline && branchingMoment) {
      setTimeout(() => {
        const timelineId = uuidv4();
        dispatch(
          branchTimeline({
            newTimelineId: timelineId,
            source: sourceTimeline,
            branchingMoment,
          })
        );
        dispatch(
          addMoment({
            momentId: uuidv4(),
            timelineId: timelineId,
            title: getMockTitle(),
          })
        );
      }, 1000);
    }
  }, [sourceTimeline?.id, branchingMoment?.id]);

  return (
    <svg style={{ margin: "30px" }} width="90%" height="100vh">
      {Object.entries(layout)
        .sort(([_, { visible }]) => (!visible ? -1 : 1))
        .map(([id, { x, y, next }]) => {
          const moment = moments.entities[id]!;
          return (
            <g data-momentId={id} key={id}>
              <ChapterSquare x={x} y={y} size={120} moment={moment} />
              {layout[next] && (
                <Arrow
                  start={{ x: x + 135, y: y + 30 }}
                  end={{ x: layout[next].x - 15, y: layout[next].y + 30 }}
                />
              )}
            </g>
          );
        })}
    </svg>
  );
};
