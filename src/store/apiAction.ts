import { createAction } from "@reduxjs/toolkit";
import { apiBodyType } from "./types";

export const apiCallBegan = createAction<apiBodyType>("api/callBegan");
