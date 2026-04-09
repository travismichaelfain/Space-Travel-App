import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button.jsx";
import Modal from "../../common/Modal/Modal.jsx";

import { destroySpacecraft } from "../../../features/spacecrafts/spacecraftThunks";

import styles from "./SpacecraftActions.module.css";

function SpacecraftActions({ spacecraftId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDecommissioning, setIsDecommissioning] = useState(false);

  function handleDispatch(e) {
    e.stopPropagation();
    navigate("/app/planets", {
      state: {
        isDispatching: true,
        selectedSpacecraftId: spacecraftId,
      },
    });
  }

  function handleUpdate(e) {
    e.stopPropagation();
    navigate(`/app/spacecrafts/update/${spacecraftId}`);
  }

  function handleOpenDecommission(e) {
    e.stopPropagation();
    setIsDecommissioning(true);
  }

  function handleCloseDecommission(e) {
    if (e) e.stopPropagation();
    setIsDecommissioning(false);
  }

  function handleConfirmDecommission(e) {
    e.stopPropagation();
    dispatch(destroySpacecraft({ id: spacecraftId }));
    setIsDecommissioning(false);
  }

  return (
    <div
      className={styles.spacecraftActions}
      onClick={(e) => e.stopPropagation()}
    >
      <Button variant="primary" onClick={handleDispatch}>
        Dispatch Spacecraft
      </Button>

      <Button variant="secondary" onClick={handleUpdate}>
        Update Spacecraft
      </Button>

      <Button variant="ghost" onClick={handleOpenDecommission}>
        Decommission Spacecraft
      </Button>

      <Modal isOpen={isDecommissioning} onClose={handleCloseDecommission}>
        <h2>Confirm Decommission</h2>
        <p>Are you sure you want to decommission this spacecraft?</p>

        <Button variant="danger" onClick={handleConfirmDecommission}>
          Confirm Decommission
        </Button>

        <Button variant="secondary" onClick={handleCloseDecommission}>
          Cancel
        </Button>
      </Modal>
    </div>
  );
}

export default SpacecraftActions;
