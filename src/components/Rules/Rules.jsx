import styles from "./Rules.module.css";

const Rules = () => {
  return (
    <div className={styles.rules}>
      <h3>Mission & Rules</h3>
      <ul>
        <li>
          Evacuate Earth by redistributing its population to other planets.
        </li>
        <li>
          Each spacecraft moves people equal to its capacity or remaining
          population, whichever is lower.
        </li>
        <li>
          A planet must have enough available population space to receive a
          transfer.
        </li>
        <li>Each planet has a limited number of spacecraft it can host.</li>
        <li>Spacecraft always carry people when dispatched.</li>
        <li>Spacecraft can be decommissioned.</li>
      </ul>
    </div>
  );
};

export default Rules;
