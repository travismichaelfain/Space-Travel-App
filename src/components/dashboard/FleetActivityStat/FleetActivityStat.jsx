// create a basic component layout
import styles from "./FleetActivityStat.module.css";

const FleetActivityStat = ({
  voyages,
  spacecraftsBuilt,
  decommissionedSpacecrafts,
}) => {
  return (
    <div className={styles.fleetActivityStat}>
      <p>Number of Voyages: {voyages}</p>
      <p>Spacecrafts Built: {spacecraftsBuilt}</p>
      <p>Decommissioned Spacecrafts: {decommissionedSpacecrafts}</p>
    </div>
  );
};

export default FleetActivityStat;
