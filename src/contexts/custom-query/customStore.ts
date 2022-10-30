import { globalStateType, ESlices } from "./types";

export const initialState = { error: "", loading: true, lastFetch: null, data: [] };

export const initialGlobalState: globalStateType = {
   [ESlices.posts]: initialState,
   [ESlices.books]: initialState,
   [ESlices.cars]: initialState,
};
