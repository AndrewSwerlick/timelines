import {
  configureStore,
  ThunkAction,
  Action,
  EntityState,
  combineReducers,
} from "@reduxjs/toolkit";
import { enhancer } from "addon-redux";
import timelineReducer from "../entities/timeline";
import cardReducer from "../entities/cards";
import featsReducer from "../entities/feats";

import { Timeline, Moment, BranchPoint, UIState, Card, Feat } from "../entities/data";

export type RootState = {
  board: {
    timelines: EntityState<Timeline>;
    moments: EntityState<Moment>;
    branchPoints: EntityState<BranchPoint>;
    ui: UIState;
  };
  cards: EntityState<Card>;
  feats: EntityState<Feat>;
};

// convert object to string and store in localStorage
function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("timelines", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("timelines");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export const store = configureStore<RootState>({
  reducer: combineReducers({
    board: timelineReducer,
    cards: cardReducer,
    feats: featsReducer,
  }),
  preloadedState: loadFromLocalStorage(),
  enhancers: [enhancer],
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
