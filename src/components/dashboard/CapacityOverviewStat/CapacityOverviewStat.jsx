import styles from "./CapacityOverviewStat.module.css";

const CapacityOverviewStat = ({ mostAvailable, leastAvailable }) => {
  if (!mostAvailable || !leastAvailable) {
    return (
      <div className={styles.capacityOverviewStat}>
        <p>Loading capacity data...</p>
      </div>
    );
  }

  return (
    <div className={styles.capacityOverviewStat}>
      <p>
        Most Available: {mostAvailable.name} {mostAvailable.percent}%
      </p>
      <p>
        Least Available: {leastAvailable.name} {leastAvailable.percent}%
      </p>
    </div>
  );
};

export default CapacityOverviewStat;
