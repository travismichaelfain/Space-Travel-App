export const selectSpacecraftById = (state, id) =>
  state.spacecrafts.spacecrafts.find((ship) => ship.id === id);

export const selectAllSpacecrafts = (state) => state.spacecrafts.spacecrafts;

export const selectSpacecraftError = (state) => state.spacecrafts.error;

export const selectSpacecraftLoading = (state) => state.spacecrafts.isLoading;

export const selectDecommissionedSpacecrafts = (state) =>
  state.spacecrafts.decommissionedSpacecrafts;

export const selectAnySpacecraftById = (state, id) => {
  const all = [
    ...state.spacecrafts.spacecrafts,
    ...state.spacecrafts.decommissionedSpacecrafts,
  ];

  return all.find((ship) => ship.id === id);
};

export const selectShipsByPlanetId = (state, planetId) =>
  selectAllSpacecrafts(state).filter(
    (ship) => ship.currentLocation === planetId,
  );

export const selectShipCountByPlanetId = (state, planetId) =>
  selectShipsByPlanetId(state, planetId).length;
