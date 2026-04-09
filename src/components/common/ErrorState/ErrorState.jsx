import styles from "./ErrorState.module.css";

function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  action,
}) {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}

export default ErrorState;
