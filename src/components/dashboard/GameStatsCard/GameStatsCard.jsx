import styles from "./GameStatsCard.module.css";

function GameStatsCard({ title, children }) {
  return (
    <div className={styles.gameStatsCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default GameStatsCard;
