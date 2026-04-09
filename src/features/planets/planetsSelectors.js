export const selectPlanetById = (state, id) =>
  state.planets.planets.find((planet) => planet.id === id);

export const selectAllPlanets = (state) => state.planets.planets;

export const selectPlanetError = (state) => state.planets.error;

export const selectPlanetLoading = (state) => state.planets.isLoading;

export const selectPlanetsByIds = (state, ids) =>
  state.planets.planets.filter((planet) => ids.includes(planet.id));

export const selectEarth = (state) => selectPlanetById(state, 2);

export function selectMissionStatus(state) {
  const earth = selectEarth(state);

  if (earth?.currentPopulation === 0) return "success";

  return "active";
}

export const selectPlanetMap = (state) => {
  const map = {};
  state.planets.planets.forEach((p) => {
    map[Number(p.id)] = p;
  });
  return map;
};
