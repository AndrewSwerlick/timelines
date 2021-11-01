import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Feat } from "./data";
import type { RootState } from "../app/store";

const featAdapter = createEntityAdapter<Feat>();

interface AttemptFeatAction {
  featType: Feat["featType"];
  characterRole: Feat["characterRole"];
}

interface RollFeatAction {
  featId: string;
  roll: number;
}

const completeFeat = createAsyncThunk<
  { cardId: string; featId: string },
  string,
  { state: RootState }
>("feats/completeFeat", async (featId: string, thunkAPI) => {
  const cardId = "";
  //thunkAPI.dispatch("draw card");
  return {
    cardId,
    featId,
  };
});
