import { Progress } from "./Progress";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Design Components/Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Overview = Template.bind({});
Overview.args = {
  color: "green",
  progress: 50,
};
