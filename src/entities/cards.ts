import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Feat, Card } from "./data";
import type { RootState } from "../app/store";

type CardTemplate = {
  description: string;
  tier: number;
  count: number;
};

type Deck = Card[];

const cardAdapter = createEntityAdapter<Card>();

const decks = { fortune: createFortunes(), failure: createFailures() };

export const cardsSlice = createSlice({
  name: "cards",
  initialState: cardAdapter.getInitialState(),
  reducers: {
    drawCard(cards, action: PayloadAction<{ deck: "fortune" | "failure" }>) {
      const card = decks[action.payload.deck].pop();
      if (card) {
        cardAdapter.addOne(cards, card);
      }
    },
  },
});

function createDeck(
  deck: "fortune" | "failure",
  templates: CardTemplate[]
): Deck {
  const byTier = _.chain(templates)
    .map((t) =>
      new Array<Card>(t.count).fill({
        description: t.description,
        id: uuidv4(),
        cardType: deck,
        tier: t.tier,
      })
    )
    .flatten()
    .groupBy(({ tier }) => {
      return tier;
    })
    .mapValues((v) => _.shuffle(v))
    .value();

  byTier["mixed"] = byTier["2"]?.splice(0, 3);
  byTier["mixed"] = byTier["mixed"].concat(byTier["1"]);
  byTier["mixed"] = _.shuffle(byTier["mixed"]);
  return byTier["2"].concat(byTier["mixed"]);
}

function createFortunes(): Deck {
  return createDeck("fortune", [
    {
      description:
        "You succeed, and unexpectedly permanently achieve one objective in this timeline",
      tier: 1,
      count: 1,
    },
    {
      description: "You accomplish what you attempted to do, but nothing more",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You succeed with an unexpected boon (+1 to any chosen feat)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You succeed and gain some unexpected wisdom (+1 to a chosen feat of knowledge or cunning)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You succeed and your confidence bring you strength (+1 to a chosen feat of strength)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You succeed and find something of great value to the people in this time (+1 to a chosen feat of cunning)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You succeed and learn a closely guarded secret (+1 to a chosen feat of shadow or cunning)",
      tier: 2,
      count: 3,
    },
    {
      description: "You succeed and you gain an unexpected ally",
      tier: 1,
      count: 2,
    },
    {
      description: "You succeed and completely remove one key obstacle",
      tier: 1,
      count: 2,
    },
  ]);
}

function createFailures(): Deck {
    return createDeck('failure',[
    { description: "You fail and one character dies", tier: 1, count: 2 },
    {
      description: "You fail and as a result permanently fail one objective",
      tier: 1,
      count: 2,
    },
    {
      description:
        "You fail and find yourself with a new, difficult obstacle to overcome",
      tier: 1,
      count: 2,
    },
    {
      description:
        "You fail and your plans are exposed (-1 to a chosen feat of cunning or shadow)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You fail and you are injured (-1 to a chosen feat of strength)",
      tier: 2,
      count: 3,
    },
    {
      description:
        "You fail and are lead astray by lies and misinformation (-1 to a chosen feat of cunning or knowledge)",
      tier: 2,
      count: 3,
    },
    {
      description: "You fail and your party is forced to seperate",
      tier: 1,
      count: 1,
    },
    {
      description: "You fail and the timeline becomes more unstable",
      tier: 2,
      count: 3,
    },
    {
      description: "You fail with no other real adverse consequences",
      tier: 2,
      count: 3,
    },
  ]);
}

export default cardsSlice.reducer;
