import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useTimeboardLayout } from "./hooks";
import { ChapterSquare } from "../../components/ChapterSquare";
import { AddChapterButton } from "../AddChapterButton";
import { Arrow } from "../../components/graphics/Arrow";

export const TimeBoard: React.FC = () => {
  const timelines = useAppSelector((state) => state.board.timelines);
  const moments = useAppSelector((state) => state.board.moments);

  const layout = useTimeboardLayout({
    momentSize: 120,
    horizontalSpacing: 120,
    verticalSpacing: 120,
  });

  const currentTimeline = Object.values(timelines.entities)[0];
  const maxX = Math.max(0, ...Object.entries(layout).map(([_, { x }]) => x));
  const maxY = Math.max(0, ...Object.entries(layout).map(([_, { y }]) => y));

  return (
    <svg
      style={{ margin: "30px", overflow: "scroll" }}
      width={`${maxX + 400}px`}
      height={`${maxY + 400}px`}
    >
      {Object.entries(layout)
        .sort(([_, { visible }]) => (!visible ? -1 : 1))
        .map(([id, { x, y, next, visible, timelineId }]) => {
          const moment = moments.entities[id]!;
          const timeline = timelines.entities[timelineId]!;
          return (
            <g data-momentId={id} key={id}>
              <ChapterSquare
                x={x}
                y={y}
                size={120}
                moment={moment}
                visible={visible}
                timeline={timeline}
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
