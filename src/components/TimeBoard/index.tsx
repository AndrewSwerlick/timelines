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
import { AddChapterButton } from "../AddChapterButton";
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
        dispatch(addMoment({ timelineId, momentId, title: getMockTitle() }));
      }, index * 500);
    });
  }

  useEffect(() => {
    setupTimeline();
  }, []);

  const currentTimeline = Object.values(timelines.entities)[0];
  const maxX = Math.max(...Object.entries(layout).map(([_, { x }]) => x));
  const maxY = Math.max(...Object.entries(layout).map(([_, { y }]) => y));

  return (
    <svg
      style={{ margin: "30px", overflow: "scroll" }}
      width={`${maxX + 400}px`}
      height={`${maxY + 400}px`}
    >
      {Object.entries(layout)
        .sort(([_, { visible }]) => (!visible ? -1 : 1))
        .map(([id, { x, y, next, visible }]) => {
          const moment = moments.entities[id]!;
          return (
            <g data-momentId={id} key={id}>
              <ChapterSquare
                x={x}
                y={y}
                size={120}
                moment={moment}
                visible={visible}
              />
              {layout[next] && (
                <Arrow
                  start={{ x: x + 135, y: y + 30 }}
                  end={{ x: layout[next].x - 15, y: layout[next].y + 30 }}
                />
              )}
            </g>
          );
        })}
      {currentTimeline && <AddChapterButton />}
    </svg>
  );
};
