import styles from "./PlanetStats.module.css";

function PlanetStats({ population, maxPopulation, currentShips, maxShips }) {
  return (
    <div className={styles.planetStats}>
      <div className={styles.populationInfo}>
        <h2>Population: {population}</h2>
        <h2>Max Population: {maxPopulation}</h2>
      </div>

      <div className={styles.spacecraftInfo}>
        <h2>Current Spacecraft: {currentShips}</h2>
        <h2>Spacecraft Capacity: {maxShips}</h2>
      </div>
    </div>
  );
}

export default PlanetStats;
