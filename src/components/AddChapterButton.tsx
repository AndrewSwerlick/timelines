import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { CirclePlus } from "./graphics/CirclePlus";
import { getCurrentTimeline, addMoment } from "../entities/timeline";

export const AddChapterButton: React.FC = () => {
  const currentTimeline = useAppSelector(getCurrentTimeline);
  const dispatch = useAppDispatch();

  const newChapterButtonPosition = currentTimeline
    ? {
        x: Math.max(currentTimeline.momentIds.length * 240 - 120, 120),
        y: 0,
      }
    : { x: 0, y: 0 };
  return currentTimeline ? (
    <CirclePlus
      x={newChapterButtonPosition!.x}
      y={newChapterButtonPosition!.y}
      size={120}
      onClick={() =>
        dispatch(
          addMoment({
            momentId: uuidv4(),
            timelineId: currentTimeline.id,
            title: "",
          })
        )
      }
    />
  ) : (
    <></>
  );
};
