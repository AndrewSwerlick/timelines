import React from "react";
import { Text } from "@visx/text";
import "@reach/dialog/styles.css";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { Pencil } from "../graphics/Pencil";
import { Square } from "../graphics/Square";
import { CirclePlus, CircleMinus } from "../graphics/CirclePlus";
import { useAppDispatch } from "../../app/hooks";
import { Moment, Timeline } from "../../entities/data";
import { branchTimeline, removeMoment } from "../../entities/timeline";

export const ChapterSquare: React.FC<{
  x: number;
  y: number;
  size: number;
  moment: Moment;
  visible: boolean;
  timeline: Timeline;
}> = ({ x, y, size = 50, moment, visible, timeline }) => {
  const history = useHistory();
  const open = () => {
    history.push(`/chapter/${moment.id}`);
  };
  const dispatch = useAppDispatch();

  return (
    <>
      <Square x={x} y={y} size={size}>
        <Text
          fontFamily="'Gloria Hallelujah', cursive"
          fontSize={13}
          width={75}
          x={50}
          y={50}
          textAnchor="middle"
          verticalAnchor="middle"
        >
          {moment.title}
        </Text>
        <Pencil x={10} y={10} size={10} />
        <rect
          x={0}
          y={0}
          width={100}
          height={100}
          strokeOpacity={0}
          onClick={open}
          fillOpacity={0}
          style={{ cursor: "pointer" }}
        />
        {visible && (
          <>
            <CirclePlus
              x={35}
              y={100}
              size={30}
              onClick={() => {
                dispatch(
                  branchTimeline({
                    newTimelineId: uuidv4(),
                    branchingMoment: moment,
                  })
                );
              }}
            />
            <CircleMinus
              x={85}
              y={100}
              size={30}
              onClick={() => {
                dispatch(
                  removeMoment({
                    timelineId: timeline.id,
                    momentId: moment.id,
                  })
                );
              }}
            />
          </>
        )}
      </Square>
    </>
  );
};
