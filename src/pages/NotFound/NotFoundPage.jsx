import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page not found</h2>

        <p className={styles.message}>
          The page you’re looking for doesn’t exist or may have moved.
        </p>

        <div className={styles.actions}>
          <Button onClick={() => navigate("/app")}>Go to Dashboard</Button>

          <Button variant="secondary" onClick={() => navigate("/")}>
            View Mission Briefing
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
