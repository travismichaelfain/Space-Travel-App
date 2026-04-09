import ProgressBar from "../../common/ProgressBar/ProgressBar";

import styles from "./MissionProgress.module.css";

function MissionProgress({
  earthPopulation,
  startingPopulation,
  evacuatedPopulation,
}) {
  const percent = startingPopulation
    ? ((evacuatedPopulation / startingPopulation) * 100).toFixed(2)
    : 0;

  const formattedPercent = `${percent}%`;

  return (
    <div className={styles.missionProgress}>
      <h2>Earth Evacuation in Progress</h2>

      <p>{formattedPercent} complete</p>

      <h3>Remaining Population: {earthPopulation}</h3>
      <h3>Evacuated: {evacuatedPopulation}</h3>

      <ProgressBar
        label="Evacuation Progress"
        value={evacuatedPopulation}
        max={startingPopulation}
      />
    </div>
  );
}

export default MissionProgress;
