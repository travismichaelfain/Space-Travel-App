export function getPlanetLimits(id) {
  const limits = {
    0: { maxPopulation: 10000, maxShipsAllowed: 1 }, // Mercury
    1: { maxPopulation: 20000, maxShipsAllowed: 1 }, // Venus
    2: { maxPopulation: 100000, maxShipsAllowed: 25 }, // Earth
    3: { maxPopulation: 15000, maxShipsAllowed: 1 }, // Mars
    4: { maxPopulation: 25000, maxShipsAllowed: 1 }, // Jupiter
    5: { maxPopulation: 30000, maxShipsAllowed: 2 }, // Saturn
    6: { maxPopulation: 10000, maxShipsAllowed: 1 }, // Uranus
    7: { maxPopulation: 10000, maxShipsAllowed: 1 }, // Neptune
  };

  return (
    limits[id] || {
      maxPopulation: 15000,
      maxShipsAllowed: 1,
    }
  );
}
