import App from "./App";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { setupMockTimeline } from "./entities/mocks";

export default {
  title: "App",
  component: App,
} as ComponentMeta<typeof App>;

export const Overview: ComponentStory<typeof App> = (args) => {
  return <App {...args} />;
};
Overview.parameters = {
  reduxSetupFn: setupMockTimeline,
};
