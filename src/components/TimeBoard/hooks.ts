import { Timeline, Moment, BranchPoint } from "../../entities/data";
import { getBranchPointsByTimelineId } from "../../entities/timeline";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

interface TimeBoardLayout {
  [index: string]: { x: number; y: number; next: string; visible: boolean };
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
  const timelines = useAppSelector((state) => state.timelines);
  const branchPointsByTimelineId = useAppSelector(getBranchPointsByTimelineId);

  function addBranchPointsToLayout({
    timeline,
    currentRow,
  }: {
    timeline: Timeline;
    currentRow: number;
  }) {
    const branchPoints = branchPointsByTimelineId[timeline.id] || [];

    branchPoints.reverse().forEach((branchPoint) => {
      const sourceMomentId = branchPoint.branches.find(
        (branch) => branch.timelineId == branchPoint.sourceTimelineId
      )!.momentId;
      const basePosition = layout[sourceMomentId];

      branchPoint.branches
        .filter((branch) => !layout[branch.momentId])
        .forEach((branch, index) => {
          if (!layout[branch.momentId]) {
            const branchTimeline = timelines.entities[branch.timelineId]!;
            const order = branchTimeline.momentIds.indexOf(branch.momentId);

            layout[branch.momentId] = {
              x: basePosition.x + 10 * (index + 1),
              y: basePosition.y + 10 * (index + 1),
              next: branchTimeline?.momentIds[order + 1],
              visible: false,
            };
          }
          const nextTimeline = timelines.entities[branch.timelineId]!;
          addTimelineToLayout({ timeline: nextTimeline, row: currentRow + 1 });
          addBranchPointsToLayout({
            timeline: nextTimeline,
            currentRow: currentRow + 1,
          });
        });
    });
  }

  function addTimelineToLayout({
    timeline,
    row,
  }: {
    timeline: Timeline;
    row: number;
  }) {
    timeline.momentIds.forEach((momentId, index) => {
      if (!layout[momentId]) {
        layout[momentId] = {
          x: index * (momentSize + horizontalSpacing),
          y: row * (momentSize + verticalSpacing),
          next: timeline.momentIds[index + 1],
          visible: true,
        };
      }
    });
  }

  timelines.ids.forEach((id) => {
    const timeline = timelines.entities[id]!;
    addTimelineToLayout({ timeline, row: 0 });
    addBranchPointsToLayout({ timeline, currentRow: 0 });
  });
  return layout;
};
