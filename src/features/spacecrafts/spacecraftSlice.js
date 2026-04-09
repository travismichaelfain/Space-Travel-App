import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "../../app/globalActions.js";
import { generateId } from "../utils/id.js";
import {
  fetchSpacecrafts,
  fetchSpacecraft,
  buildSpacecraft,
  destroySpacecraft,
  sendSpacecraftToPlanet,
} from "./spacecraftThunks";

const savedDecommissioned =
  JSON.parse(localStorage.getItem("decommissionedSpacecrafts")) || [];

const initialState = {
  spacecrafts: [],
  decommissionedSpacecrafts: savedDecommissioned,
  isLoading: false,
  error: null,
};

const spacecraftSlice = createSlice({
  name: "spacecrafts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateSpacecraft: (state, action) => {
      const { id, ...spacecraftData } = action.payload;
      const idx = state.spacecrafts.findIndex((ship) => ship.id === id);
      if (idx !== -1) {
        state.spacecrafts[idx] = {
          ...state.spacecrafts[idx],
          ...spacecraftData,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => ({ ...initialState }))

      // FETCH ALL
      .addCase(fetchSpacecrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpacecrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.spacecrafts = action.payload.map((ship) => ({
          ...ship,
          id: ship.id ?? generateId(),
          capacity: Number(ship.capacity),
          currentLocation: Number(ship.currentLocation),
          travelLog: ship.travelLog || [],
          isActive: true,
        }));
      })
      .addCase(fetchSpacecrafts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // FETCH ONE
      .addCase(fetchSpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const fetchedShip = action.payload;
        const idx = state.spacecrafts.findIndex(
          (ship) => ship.id === fetchedShip.id,
        );

        if (idx !== -1) {
          state.spacecrafts[idx] = fetchedShip;
        } else {
          state.spacecrafts.push(fetchedShip);
        }
      })
      .addCase(fetchSpacecraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // BUILD
      .addCase(buildSpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(buildSpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.spacecrafts.push({
          ...action.payload,
          currentLocation: Number(2),
          travelLog: [],
          id: generateId(),
        });
      })
      .addCase(buildSpacecraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // DESTROY
      .addCase(destroySpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(destroySpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const destroyedId = action.meta.arg.id;

        const removedShip = state.spacecrafts.find(
          (ship) => ship.id === destroyedId,
        );

        if (removedShip) {
          state.decommissionedSpacecrafts.push(removedShip);
        }

        localStorage.setItem(
          "decommissionedSpacecrafts",
          JSON.stringify(state.decommissionedSpacecrafts),
        );

        state.spacecrafts = state.spacecrafts.filter(
          (ship) => ship.id !== destroyedId,
        );
      })
      .addCase(destroySpacecraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // SEND TO PLANET
      .addCase(sendSpacecraftToPlanet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSpacecraftToPlanet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const updatedSpacecrafts = action.payload.spacecrafts;

        state.spacecrafts = state.spacecrafts.map((existingShip) => {
          const updatedShip = updatedSpacecrafts.find(
            (ship) => ship.id === existingShip.id,
          );

          if (!updatedShip) return existingShip;

          return {
            ...existingShip,
            ...updatedShip,
            travelLog: [
              ...existingShip.travelLog.slice(-2),
              existingShip.currentLocation,
            ],
          };
        });
      })
      .addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, updateSpacecraft } = spacecraftSlice.actions;
export default spacecraftSlice.reducer;
