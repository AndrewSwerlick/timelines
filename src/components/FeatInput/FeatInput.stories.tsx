import { FeatInput } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Moment } from "../../entities/data";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

export default {
  title: "Feat Input",
  component: FeatInput,
} as ComponentMeta<typeof FeatInput>;

const demoMoment: Moment = {
  id: uuidv4(),
  parentId: uuidv4(),
  featIds: [],
  events: ["Johnny went to the store"],
  title: "The one with the tiny birds",
  timelineId: uuidv4(),
};

const Container = styled.div`
  display: flex;
`;

const Template: ComponentStory<typeof FeatInput> = (args) => (
  <Container>
    <FeatInput {...args} />
  </Container>
);

export const Overview = Template.bind({});
Overview.args = {
  useCurrentMoment: () => demoMoment,
};
