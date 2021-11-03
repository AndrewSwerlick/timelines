import { Timeline } from "../../entities/data";
import { getBranchPointsByTimelineId } from "../../entities/timeline";
import { useAppSelector } from "../../app/hooks";
import _ from "lodash";

interface TimeBoardLayout {
  [index: string]: {
    x: number;
    y: number;
    next: string;
    visible: boolean;
    timelineId: string;
  };
}

interface TimeBoardLayoutOptions {
  momentSize: number;
  horizontalSpacing: number;
  verticalSpacing: number;
}

export const useTimeboardLayout = ({
  momentSize,
  horizontalSpacing,
  verticalSpacing,
}: TimeBoardLayoutOptions) => {
  const layout: TimeBoardLayout = {};
  const timelines = useAppSelector((state) => state.board.timelines);
  const branchPointsByTimelineId = useAppSelector(getBranchPointsByTimelineId);
  let rows = 0;

  function addBranchPointsToLayout({ timeline }: { timeline: Timeline }) {
    const branchPoints = branchPointsByTimelineId[timeline.id] || [];

    const inReverseTimelineOrder = _.sortBy(branchPoints, (branchPoint) => {
      return (
        timelines.entities[branchPoint.sourceTimelineId]!.momentIds.indexOf(
          branchPoint.id
        ) * -1
      );
    });

    inReverseTimelineOrder.forEach((branchPoint) => {
      const sourceMomentId = branchPoint.id;
      const basePosition = layout[sourceMomentId];

      const secondaryBranches = branchPoint.branches.filter(
        (branch) => !layout[branch.momentId]
      );

      secondaryBranches.forEach((branch, index) => {
        if (!layout[branch.momentId]) {
          const branchTimeline = timelines.entities[branch.timelineId]!;
          const timelineOrder = branchTimeline.momentIds.indexOf(
            branch.momentId
          );

          layout[branch.momentId] = {
            x: basePosition.x - 10 * (index + 1),
            y: basePosition.y - 10 * (index + 1),
            next: branchTimeline?.momentIds[timelineOrder + 1],
            visible: false,
            timelineId: branchTimeline.id,
          };
        }
        const branchTimeline = timelines.entities[branch.timelineId]!;

        rows = rows + 1;

        addTimelineToLayout({ timeline: branchTimeline });
        addBranchPointsToLayout({
          timeline: branchTimeline,
        });
      });
    });
  }

  function addTimelineToLayout({ timeline }: { timeline: Timeline }) {
    timeline.momentIds.forEach((momentId, index) => {
      if (!layout[momentId]) {
        layout[momentId] = {
          x: index * (momentSize + horizontalSpacing),
          y: rows * (momentSize + verticalSpacing),
          next: timeline.momentIds[index + 1],
          visible: true,
          timelineId: timeline.id,
        };
      }
    });
  }

  const firstTimeline = timelines.entities[timelines.ids[0]];
  if (firstTimeline) {
    addTimelineToLayout({ timeline: firstTimeline });
    addBranchPointsToLayout({ timeline: firstTimeline });
  }
  return layout;
};
