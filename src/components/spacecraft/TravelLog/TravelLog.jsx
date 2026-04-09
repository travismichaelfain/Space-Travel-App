import styles from "./TravelLog.module.css";
import { useSelector } from "react-redux";
import { selectPlanetMap } from "../../../features/planets/planetsSelectors";

const TravelLog = ({ travelLog }) => {
  const planetMap = useSelector(selectPlanetMap);

  if (!travelLog?.length) {
    return (
      <div className={styles.travelLog}>
        <h3>Travel Log</h3>
        <p className={styles.empty}>No voyages yet</p>
      </div>
    );
  }

  return (
    <div className={styles.travelLog}>
      <h3>Travel Log</h3>

      <div className={styles.logInline}>
        {travelLog.map((id, idx) => (
          <span key={idx} className={styles.logItem}>
            {planetMap[id]?.name || "Unknown"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TravelLog;
