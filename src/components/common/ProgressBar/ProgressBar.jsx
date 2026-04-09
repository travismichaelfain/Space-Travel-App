import styles from "./ProgressBar.module.css";

function ProgressBar({
  label,
  value,
  max,
  previewValue = null,
  previewType = null,
}) {
  const currentPercent = max === 0 ? 0 : (value / max) * 100;
  const hasPreview = previewValue !== null && previewValue !== value;
  const previewPercent =
    hasPreview && max !== 0 ? (previewValue / max) * 100 : 0;

  const clampedCurrentPercent = Math.min(currentPercent, 100);
  const clampedPreviewPercent = Math.min(previewPercent, 100);

  const previewDirectionClass =
    previewType === "decrease"
      ? styles.previewDecrease
      : previewType === "increase"
        ? styles.previewIncrease
        : "";

  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.header}>
          <span>{label}</span>
          <span>
            {hasPreview ? `${value} → ${previewValue}` : `${value} / ${max}`}
          </span>
        </div>
      )}

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clampedCurrentPercent}%` }}
        />

        {hasPreview && (
          <div
            className={`${styles.previewFill} ${previewDirectionClass}`}
            style={{ width: `${clampedPreviewPercent}%` }}
          />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
