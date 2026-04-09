import styles from "./Rules.module.css";

const Rules = () => {
  return (
    <div className={styles.rules}>
      <h3>Mission & Rules</h3>
      <ul>
        <li>
          <b>MISSION</b> - Evacuate Earth by transporting its population to
          other planets.
        </li>
        <li>
          <b>GOAL</b> - Move all people off Earth without exceeding any planet’s
          limits.
        </li>
        <li>
          <b>HOW IT WORKS</b> - Build your fleet. Then dispatch spacecrafts
          around the galexy with the people of Earth. To dispatch, select a
          spacecraft, then choose a destination planet. Each spacecraft carries
          as many people as possible, up to its capacity or the remaining
          population of the planet it's currently located (whichever is lower).
        </li>
        <li>
          <b>CONSTRAINTS</b> - Planets have a maximum population they can
          support. Planets also have a limit on how many spacecraft they can
          host. You cannot send a spacecraft to a planet that cannot accept both
          the people and the ship.
        </li>
        <li>
          <b>OTHER ACTIONS</b> - Spacecraft can be decommissioned to free up
          space on crowded planets.
        </li>
        <li>
          <b>VICTORY</b> - Earth’s population reaches zero.
        </li>
      </ul>
    </div>
  );
};

export default Rules;
