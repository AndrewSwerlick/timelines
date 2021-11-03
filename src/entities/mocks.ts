import _ from "lodash";
import { store } from "../app/store";
import { v4 as uuidv4 } from "uuid";
import { createNewTimeline, addMoment } from "../entities/timeline";

const mockTitles = [
  "The One with the Sonogram at the End",
  "The One with the Thumb",
  "The One with George Stephanopoulos",
  "The One with the East German Laundry Detergent",
  "The One with the Butt",
  "The One with the Blackout",
  "The One Where Nana Dies Twice",
  "The One Where Underdog Gets Away",
  "The One with the Monkey",
  "The One with Mrs. Bing",
  "The One with the Dozen Lasagnas",
  "The One with the Candy Hearts",
  "The One with the Stoned Guy",
  "The One with Two Parts: Part 1",
  "The One with Two Parts: Part 2",
  "The One with All the Poker",
  "The One Where the Monkey Gets Away",
  "The One with the Evil Orthodontist",
  "The One with the Fake Monica",
  "The One with the Ick Factor",
  "The One with the Birth",
  "The One Where Rachel Finds Out",
];

export const setupMockTimeline = (dispatch: (typeof store.dispatch)) => {
  const timelineId = uuidv4();
  dispatch(createNewTimeline({ id: timelineId }));
  [...Array(5)].forEach((_, index) => {
    const momentId = uuidv4();
    setTimeout(() => {
      dispatch(addMoment({ timelineId, momentId, title: getMockTitle() }));
    }, index * 500);
  });
};

export const getMockTitle = () => {
  return _.sample(mockTitles)!;
};
