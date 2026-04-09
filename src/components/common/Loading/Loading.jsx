import styles from "./Loading.module.css";

function Loading({ message = "Loading..." }) {
  return (
    <div className={styles.loadingWrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Loading;
