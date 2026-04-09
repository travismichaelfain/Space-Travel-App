import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SpacecraftActions from "../SpacecraftActions/SpacecraftActions";
import TravelLog from "../TravelLog/TravelLog";
import { selectPlanetMap } from "../../../features/planets/planetsSelectors";

import styles from "./SpacecraftCard.module.css";

function SpacecraftCard({ spacecraft, showActions }) {
  const navigate = useNavigate();
  const planetMap = useSelector(selectPlanetMap);

  if (!spacecraft) return null;

  const { id, name, capacity, pictureUrl, currentLocation, travelLog } =
    spacecraft;

  const locationLabel = planetMap[currentLocation]?.name ?? "Unknown";

  function handleOpenDetails() {
    navigate(`/app/spacecrafts/details/${id}`);
  }

  function handleCardKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenDetails();
    }
  }

  return (
    <div
      className={styles.spacecraftCard}
      onClick={handleOpenDetails}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>

      <div className={styles.infoContainer}>
        <img
          src={pictureUrl}
          alt={`Image of ${name}`}
          className={styles.spacecraftImage}
        />

        <p>Capacity: {capacity}</p>
        <p>Current Location: {locationLabel}</p>

        <TravelLog travelLog={travelLog} />
      </div>

      {showActions && (
        <div onClick={(e) => e.stopPropagation()}>
          <SpacecraftActions spacecraftId={id} />
        </div>
      )}
    </div>
  );
}

export default SpacecraftCard;
