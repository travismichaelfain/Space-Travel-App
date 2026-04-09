import { useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button";
import ProgressBar from "../../common/ProgressBar/ProgressBar";

import styles from "./PlanetCard.module.css";

function PlanetCard({
  planet,
  shipCount,
  isSelectable,
  onClick,
  isSelected,
  disablePlanetDetails = false,
  previewPopulation,
  previewShipCount,
  isPreviewActive,
  isPreviewOrigin,
  isPreviewTarget,
  isPreviewAffected,
}) {
  const navigate = useNavigate();

  if (!planet) return null;

  const { id, name, currentPopulation, maxPopulation, maxShipsAllowed } =
    planet;

  function handleNavigateDetails(e) {
    e.stopPropagation();
    navigate(`/app/planets/details/${id}`);
  }

  function handleCardClick() {
    if (isSelectable && onClick) {
      onClick();
    }
  }

  const previewPopulationChange = previewPopulation - currentPopulation;
  const previewShipCountChange = previewShipCount - shipCount;

  const populationDisplayValue =
    isPreviewActive && isPreviewAffected
      ? `${currentPopulation} → ${previewPopulation} / ${maxPopulation}`
      : `${currentPopulation} / ${maxPopulation}`;

  const spacecraftDisplayValue =
    isPreviewActive && isPreviewAffected
      ? `${shipCount} → ${previewShipCount} / ${maxShipsAllowed}`
      : `${shipCount} / ${maxShipsAllowed}`;

  const previewBadgeLabel = isPreviewOrigin
    ? "Origin Preview"
    : isPreviewTarget
      ? "Target Preview"
      : null;

  const previewType = isPreviewOrigin
    ? "decrease"
    : isPreviewTarget
      ? "increase"
      : null;

  const cardClasses = [
    styles.planetCard,
    isSelectable ? styles.selectable : styles.disabled,
    isSelected ? styles.selected : "",
    isPreviewActive ? styles.previewMode : "",
    isPreviewAffected ? styles.previewAffected : "",
    isPreviewOrigin ? styles.previewOrigin : "",
    isPreviewTarget ? styles.previewTarget : "",
  ].join(" ");

  return (
    <div onClick={handleCardClick} className={cardClasses}>
      <div className={styles.header}>
        <h2>{name}</h2>
        {previewBadgeLabel && (
          <span className={styles.previewBadge}>{previewBadgeLabel}</span>
        )}
      </div>

      <div className={styles.metricBlock}>
        <div className={styles.metricHeader}>
          <span className={styles.metricLabel}>Population</span>
          <span className={styles.metricValue}>{populationDisplayValue}</span>
        </div>

        <ProgressBar
          value={currentPopulation}
          max={maxPopulation}
          previewValue={isPreviewAffected ? previewPopulation : null}
          previewType={previewType}
        />

        {isPreviewActive && isPreviewAffected && (
          <div className={styles.previewDelta}>
            {previewPopulationChange > 0 ? "+" : ""}
            {previewPopulationChange} projected population
          </div>
        )}
      </div>

      <div className={styles.metricBlock}>
        <div className={styles.metricHeader}>
          <span className={styles.metricLabel}>Spacecraft</span>
          <span className={styles.metricValue}>{spacecraftDisplayValue}</span>
        </div>

        <ProgressBar
          value={shipCount}
          max={maxShipsAllowed}
          previewValue={isPreviewAffected ? previewShipCount : null}
          previewType={previewType}
        />

        {isPreviewActive && isPreviewAffected && (
          <div className={styles.previewDelta}>
            {previewShipCountChange > 0 ? "+" : ""}
            {previewShipCountChange} projected spacecraft
          </div>
        )}
      </div>

      <Button
        variant="primary"
        onClick={handleNavigateDetails}
        disabled={disablePlanetDetails}
      >
        View Planet Details
      </Button>
    </div>
  );
}

export default PlanetCard;
