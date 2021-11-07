import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useParams } from "react-router-dom";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentMomentRedux = () => {
  const { id } = useParams<{ id?: string }>();
  const moment = useAppSelector((state) => state.board.moments.entities[id!])!;
  return moment;
};
