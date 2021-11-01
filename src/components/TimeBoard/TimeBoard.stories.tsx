import { TimeBoard } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { setupMockTimeline } from "../../entities/mocks";

export default {
  title: "Time Board",
  component: TimeBoard,
} as ComponentMeta<typeof TimeBoard>;

export const Overview: ComponentStory<typeof TimeBoard> = (args) => {
  return <TimeBoard {...args} />;
};
Overview.parameters = {
  reduxSetupFn: setupMockTimeline,
};
