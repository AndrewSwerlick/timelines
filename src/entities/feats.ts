import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityId,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Feat } from "./data";
import { addEvent } from "./timeline";
import { drawCard } from "./cards";
import type { RootState } from "../app/store";

const featAdapter = createEntityAdapter<Feat>();

export type FeatDetails = {
  featType: "knowledge" | "cunning" | "stealth" | "strength";
  description: string;
  result: "success" | "failure";
  roll: number;
  characterRole: "scholar" | "solider" | "snake" | "shadow";
  momentId: string;
}

const toString = (feat: Feat) =>
  `The ${feat.characterRole} ${feat.description}`;

export const completeFeat = createAsyncThunk<
  { cardId: EntityId; feat: Feat },
  FeatDetails,
  { state: RootState }
>("feats/completeFeat", async (featDetails: FeatDetails, thunkAPI) => {
  thunkAPI.dispatch(
    drawCard({ deck: featDetails.result == "success" ? "fortune" : "failure" })
  );
  const cardId = thunkAPI.getState().cards.ids[-1];
  const feat: Feat = {
    id: uuidv4(),
    cardId: cardId,
    ...featDetails,
  };
  thunkAPI.dispatch(
    addEvent({ momentId: featDetails.momentId, text: toString(feat) })
  );
  return {
    cardId,
    feat,
  };
});

export const featsSlice = createSlice({
  name: "feats",
  initialState: featAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(completeFeat.fulfilled, (feats, action) => {
      featAdapter.addOne(feats, action.payload.feat);
    });
  },
});

export default featsSlice.reducer;
