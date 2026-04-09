import styles from "./MissionOutcomePage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetApp } from "../../app/globalActions.js";
import Button from "../../components/common/Button/Button.jsx";

function MissionSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePlayAgain() {
    localStorage.clear();
    dispatch(resetApp());
    navigate("/", { replace: true });
  }

  return (
    <section className={styles.missionOutcomePage}>
      <div className={styles.content}>
        <h1>Mission Success</h1>
        <p>Earth has been successfully evacuated.</p>
      </div>
      <Button onClick={handlePlayAgain}>Restart Mission</Button>
    </section>
  );
}

export default MissionSuccessPage;
