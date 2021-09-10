import React from "react";
import { Text } from "@visx/text";
import { Dialog } from "@reach/dialog";
import styled from "styled-components";
import "@reach/dialog/styles.css";
import { v4 as uuidv4 } from "uuid";
import { Pencil } from "../graphics/Pencil";
import { Square } from "../graphics/Square";
import { CirclePlus } from "../graphics/CirclePlus";
import { useAppDispatch } from "../../app/hooks";
import { Moment } from "../../entities/data";
import { ChapterView } from "../ChapterView";
import { branchTimeline } from "../../entities/timeline";

const Editor = styled(Dialog)`
  border-radius: 15px 5px 5px 25px/5px 25px 25px 5px;
  border: 2px solid #333;
  min-height: 400px;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

export const ChapterSquare: React.FC<{
  x: number;
  y: number;
  size: number;
  moment: Moment;
  visible: boolean;
}> = ({ x, y, size = 50, moment, visible }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
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
        <Pencil x={80} y={10} size={10} />
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
        )}
      </Square>
      <Editor isOpen={showDialog} onDismiss={close}>
        <ChapterView close={close} moment={moment} />
      </Editor>
    </>
  );
};
