import styles from "./FleetUsageStat.module.css";

const FleetUsageStat = ({
  utilizationRate,
  activeSpacecrafts,
  totalSpacecrafts,
}) => {
  return (
    <div className={styles.fleetUsageStat}>
      <p>Active Spacecrafts: {activeSpacecrafts}</p>
      <p>Operational Spacecrafts: {totalSpacecrafts}</p>
      <p>Utilization Rate: {utilizationRate}%</p>
    </div>
  );
};

export default FleetUsageStat;
