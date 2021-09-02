import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useTimeboardLayout } from "./hooks";
import {
  branchTimeline,
  createNewTimeline,
  addMoment,
} from "../../entities/timeline";
import { Square } from "../../components/graphics/Square";
import { Arrow } from "../../components/graphics/Arrow";

export const TimeBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const timelines = useAppSelector((state) => state.timelines);
  const sourceTimeline = Object.values(timelines.entities)[0];
  const branchingMoment = useAppSelector((state) => {
    if (sourceTimeline) {
      return state.moments.entities[sourceTimeline?.momentIds[3]];
    }
  });
  const layout = useTimeboardLayout();

  function setupTimeline() {
    const timelineId = uuidv4();
    dispatch(createNewTimeline({ id: timelineId }));
    [...Array(5)].forEach((i, index) => {
      const momentId = uuidv4();
      setTimeout(() => {
        console.log("adding");
        dispatch(addMoment({ timelineId, momentId }));
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
        dispatch(addMoment({ momentId: uuidv4(), timelineId: timelineId }));
      }, 1000);
    }
  }, [sourceTimeline?.id, branchingMoment?.id]);

  return (
    <svg width="90%" height="100vh">
      {Object.entries(layout).map(([id, { x, y, next }]) => {
        return (
          <g data-momentId={id} key={id}>
            <Square x={x} y={y} size={60} />
            {layout[next] && (
              <Arrow
                start={{ x: x + 75, y: y + 30 }}
                end={{ x: layout[next].x - 15, y: layout[next].y + 30 }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
