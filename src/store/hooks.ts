import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import type { RootState, AppDispatch } from "./configureStore";

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export type { RootState };
