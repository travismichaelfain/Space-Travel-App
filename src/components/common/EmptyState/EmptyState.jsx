import styles from "./EmptyState.module.css";

function EmptyState({
  title = "Nothing here yet",
  message = "There’s no data to display.",
  action,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}

export default EmptyState;
