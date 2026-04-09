import { createAsyncThunk } from "@reduxjs/toolkit";
import SpaceTravelApi from "../../services/SpaceTravelApi";

export const fetchSpacecrafts = createAsyncThunk(
  "spacecrafts/fetchSpacecrafts",
  async () => {
    const res = await SpaceTravelApi.getSpacecrafts();
    return res.data;
  },
);

export const fetchSpacecraft = createAsyncThunk(
  "spacecrafts/fetchSpacecraft",
  async ({ id }) => {
    const res = await SpaceTravelApi.getSpacecraftById({ id });
    return res.data;
  },
);

export const buildSpacecraft = createAsyncThunk(
  "spacecrafts/buildSpacecraft",
  async (spacecraftData) => {
    const res = await SpaceTravelApi.buildSpacecraft(spacecraftData);
    return res.data ?? spacecraftData;
  },
);

export const destroySpacecraft = createAsyncThunk(
  "spacecrafts/destroySpacecraft",
  async ({ id }) => {
    const res = await SpaceTravelApi.destroySpacecraftById({ id });
    return res.data;
  },
);

export const sendSpacecraftToPlanet = createAsyncThunk(
  "spacecrafts/send",
  async ({ spacecraftId, targetPlanetId }) => {
    await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId,
    });

    const spacecrafts = await SpaceTravelApi.getSpacecrafts();
    const planets = await SpaceTravelApi.getPlanets();

    return { spacecrafts: spacecrafts.data, planets: planets.data };
  },
);
