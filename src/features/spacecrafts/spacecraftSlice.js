import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "../../app/globalActions.js";
import {
  fetchSpacecrafts,
  fetchSpacecraft,
  buildSpacecraft,
  destroySpacecraft,
  sendSpacecraftToPlanet,
} from "./spacecraftThunks";

const savedDecommissioned =
  JSON.parse(localStorage.getItem("decommissionedSpacecrafts")) || [];

const savedTravelLogs =
  JSON.parse(localStorage.getItem("spacecraftTravelLogs")) || {};

function getSavedTravelLog(shipId) {
  return savedTravelLogs[String(shipId)] || [];
}

function saveTravelLogs(spacecrafts) {
  const travelLogMap = spacecrafts.reduce((acc, ship) => {
    acc[String(ship.id)] = ship.travelLog || [];
    return acc;
  }, {});

  localStorage.setItem("spacecraftTravelLogs", JSON.stringify(travelLogMap));
}

function normalizeShip(ship) {
  return {
    ...ship,
    id: String(ship.id),
    capacity: Number(ship.capacity),
    currentLocation: Number(ship.currentLocation),
    travelLog:
      Array.isArray(ship.travelLog) && ship.travelLog.length
        ? ship.travelLog.map((locationId) => Number(locationId))
        : getSavedTravelLog(ship.id).map((locationId) => Number(locationId)),
    isActive: true,
  };
}

const initialState = {
  spacecrafts: [],
  decommissionedSpacecrafts: savedDecommissioned.map(normalizeShip),
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
      const normalizedId = String(id);

      const idx = state.spacecrafts.findIndex(
        (ship) => ship.id === normalizedId,
      );

      if (idx !== -1) {
        state.spacecrafts[idx] = normalizeShip({
          ...state.spacecrafts[idx],
          ...spacecraftData,
          id: normalizedId,
        });
      }

      saveTravelLogs(state.spacecrafts);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => ({
        ...initialState,
        decommissionedSpacecrafts: [],
      }))

      .addCase(fetchSpacecrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpacecrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.spacecrafts = action.payload.map(normalizeShip);
      })
      .addCase(fetchSpacecrafts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchSpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const fetchedShip = normalizeShip(action.payload);

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

      .addCase(buildSpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(buildSpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const builtShip = normalizeShip({
          ...action.payload,
          currentLocation: action.payload.currentLocation ?? 2,
          travelLog: action.payload.travelLog ?? [],
        });

        state.spacecrafts.push(builtShip);
        saveTravelLogs(state.spacecrafts);
      })
      .addCase(buildSpacecraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(destroySpacecraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(destroySpacecraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const destroyedId = String(action.meta.arg.id);

        const removedShip = state.spacecrafts.find(
          (ship) => ship.id === destroyedId,
        );

        if (removedShip) {
          const alreadyDecommissioned = state.decommissionedSpacecrafts.some(
            (ship) => ship.id === destroyedId,
          );

          if (!alreadyDecommissioned) {
            state.decommissionedSpacecrafts.push(removedShip);
          }
        }

        localStorage.setItem(
          "decommissionedSpacecrafts",
          JSON.stringify(state.decommissionedSpacecrafts),
        );

        state.spacecrafts = state.spacecrafts.filter(
          (ship) => ship.id !== destroyedId,
        );

        saveTravelLogs(state.spacecrafts);
      })
      .addCase(destroySpacecraft.rejected, (state, action) => {
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

        const updatedSpacecrafts =
          action.payload.spacecrafts.map(normalizeShip);

        state.spacecrafts = state.spacecrafts.map((existingShip) => {
          const updatedShip = updatedSpacecrafts.find(
            (ship) => ship.id === existingShip.id,
          );

          if (!updatedShip) return existingShip;

          const previousLocation = existingShip.currentLocation;
          const previousLog = existingShip.travelLog || [];
          const lastLoggedLocation = previousLog[previousLog.length - 1];

          const nextTravelLog =
            lastLoggedLocation === previousLocation
              ? previousLog.slice(-3)
              : [...previousLog.slice(-2), previousLocation];

          return {
            ...existingShip,
            ...updatedShip,
            travelLog: nextTravelLog,
          };
        });

        saveTravelLogs(state.spacecrafts);
      })
      .addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, updateSpacecraft } = spacecraftSlice.actions;
export default spacecraftSlice.reducer;
