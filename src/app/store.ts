import {
  configureStore,
  ThunkAction,
  Action,
  EntityState,
} from "@reduxjs/toolkit";
import timelineReducer from "../entities/timeline";
import { Timeline, Moment, BranchPoint, UIState } from "../entities/data";

export type RootState = {
  timelines: EntityState<Timeline>;
  moments: EntityState<Moment>;
  branchPoints: EntityState<BranchPoint>;
  ui: UIState;
};

export const store = configureStore<RootState>({
  reducer: timelineReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
