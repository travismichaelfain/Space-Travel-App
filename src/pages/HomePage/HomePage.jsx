import styles from "./HomePage.module.css";
import Rules from "../../components/Rules/Rules";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <h1>Critical Mission: Evacuate Earth</h1>
        <Rules />
        <Button variant="primary" onClick={() => navigate("/app")}>
          Start Mission
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
