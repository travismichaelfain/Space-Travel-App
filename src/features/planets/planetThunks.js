import { createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async () => {
    const res = await SpaceTravelApi.getPlanets();
    return res.data;
  },
);
