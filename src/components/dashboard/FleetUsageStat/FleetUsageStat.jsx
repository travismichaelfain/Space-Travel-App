import styles from "./FleetUsageStat.module.css";

const FleetUsageStat = ({ utilizationRate, activeShips, totalSpacecrafts }) => {
  return (
    <div className={styles.fleetUsageStat}>
      <p>Active Spacecrafts: {activeShips}</p>
      <p>Operational Spacecrafts: {totalSpacecrafts}</p>
      <p>Utilization Rate: {utilizationRate}%</p>
    </div>
  );
};

export default FleetUsageStat;
