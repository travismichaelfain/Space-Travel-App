import styles from "./DispatchSummary.module.css";

const DispatchSummary = ({ selectedSpacecraft, selectedPlanet }) => {
  return (
    <div className={styles.dispatchSummary}>
      <h3>Dispatch: {selectedSpacecraft ? selectedSpacecraft.name : "None"}</h3>
      <h3>To: {selectedPlanet ? selectedPlanet.name : "None"}</h3>
    </div>
  );
};

export default DispatchSummary;
