import { createSlice } from "@reduxjs/toolkit";
import { fetchPlanets } from "./planetThunks";
import { sendSpacecraftToPlanet } from "../spacecrafts/spacecraftThunks.js";
import { resetApp } from "../../app/globalActions.js";
import { getPlanetLimits } from "../utils/planetLimits.js";

const initialState = {
  planets: [],
  isLoading: false,
  error: null,
};

const planetSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => ({ ...initialState }))
      // FETCH
      .addCase(fetchPlanets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.planets = action.payload.map((planet) => {
          const { maxPopulation, maxShipsAllowed } = getPlanetLimits(planet.id);
          return {
            ...planet,
            maxPopulation,
            maxShipsAllowed,
          };
        });
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(sendSpacecraftToPlanet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSpacecraftToPlanet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const updatedPlanets = action.payload.planets;

        state.planets = state.planets.map((existingPlanet) => {
          const updatedPlanet = updatedPlanets.find(
            (planet) => planet.id === existingPlanet.id,
          );

          if (!updatedPlanet) return existingPlanet;

          return {
            ...existingPlanet,
            ...updatedPlanet,
          };
        });
      })
      .addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default planetSlice.reducer;
