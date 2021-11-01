import { ChapterView } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Moment } from "../../entities/data";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Chapter View",
  component: ChapterView,
} as ComponentMeta<typeof ChapterView>;

const demoMoment: Moment = {
    id: uuidv4(),
    parentId: uuidv4(),
    featIds: [],
    narrative: "Johnny went to the store",
    title: "The one with the tiny birds",
    timelineId: uuidv4(),
}

const Template: ComponentStory<typeof ChapterView> = (args) => (
  <ChapterView {...args} />
);

export const Overview = Template.bind({});
Overview.args = {
  moment: demoMoment,
  close: () => {},
};
