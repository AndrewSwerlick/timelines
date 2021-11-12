import { CreateSavePoint } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Moment } from "../../entities/data";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Create Save Point",
  component: CreateSavePoint,
} as ComponentMeta<typeof CreateSavePoint>;

const demoMoment: Moment = {
  id: uuidv4(),
  parentId: uuidv4(),
  featIds: [],
  events: ["Johnny went to the store"],
  title: "The one with the tiny birds",
  timelineId: uuidv4(),
};

const Template: ComponentStory<typeof CreateSavePoint> = (args) => (
  <CreateSavePoint {...args} />
);

export const Overview = Template.bind({});
Overview.args = {
  useCurrentMoment: () => demoMoment,
};
