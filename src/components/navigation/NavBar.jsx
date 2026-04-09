import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button/Button";
import Modal from "../common/Modal/Modal";
import Rules from "../Rules/Rules";

import { resetApp } from "../../app/globalActions";
import SpaceTravelApi from "../../services/SpaceTravelMockApi";

import styles from "./NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  function handleNavigate(path) {
    navigate(path);
  }

  function handleOpenSupport() {
    setIsSupportOpen(true);
  }

  function handleCloseSupport() {
    setIsSupportOpen(false);
  }

  async function handleResetApp() {
    await SpaceTravelApi.resetData();

    dispatch(resetApp());
    setIsSupportOpen(false);
    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <Button variant="dashboard" onClick={() => handleNavigate("/app")}>
        Dashboard
      </Button>

      <Button
        variant="primary"
        onClick={() => handleNavigate("/app/spacecrafts")}
      >
        Manage Fleet
      </Button>

      <Button
        variant="secondary"
        onClick={() => handleNavigate("/app/planets")}
      >
        View Planets
      </Button>

      <Button variant="ghost" onClick={handleOpenSupport}>
        Mission Support
      </Button>

      <Modal isOpen={isSupportOpen} onClose={handleCloseSupport}>
        <h2>Mission Support</h2>

        <Rules />

        <Button variant="danger" onClick={handleResetApp}>
          Reset App
        </Button>
      </Modal>
    </nav>
  );
}

export default NavBar;
