import Button from "../../common/Button/Button";
import DispatchSummary from "../DispatchSummary/DispatchSummary";
import ShipSelection from "../ShipSelection/ShipSelection";

import styles from "./DispatchMenu.module.css";

function DispatchMenu({
  selectedSpacecraft,
  selectedPlanet,
  onClose,
  onSelectShip,
  selectedSpacecraftId,
  spacecrafts,
  onConfirmDispatch,
}) {
  const isDispatchDisabled = !selectedSpacecraft || !selectedPlanet;

  return (
    <div className={styles.dispatchMenu}>
      <h2>Dispatch Control Center</h2>

      <ShipSelection
        spacecrafts={spacecrafts}
        selectedSpacecraftId={selectedSpacecraftId}
        onSelectShip={onSelectShip}
      />

      <h3>Select an available planet</h3>

      <DispatchSummary
        selectedSpacecraft={selectedSpacecraft}
        selectedPlanet={selectedPlanet}
      />

      <Button disabled={isDispatchDisabled} onClick={onConfirmDispatch}>
        Execute Dispatch
      </Button>

      <Button onClick={onClose}>Close Dispatch Control</Button>
    </div>
  );
}

export default DispatchMenu;
