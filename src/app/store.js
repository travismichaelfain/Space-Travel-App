import { configureStore } from "@reduxjs/toolkit";
import spacecraftReducer from "../features/spacecrafts/spacecraftSlice";
import planetReducer from "../features/planets/planetSlice";

export const store = configureStore({
  reducer: {
    spacecrafts: spacecraftReducer,
    planets: planetReducer,
  },
});
