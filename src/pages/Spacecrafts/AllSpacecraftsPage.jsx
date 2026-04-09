import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./AllSpacecraftsPage.module.css";

import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Loading from "../../components/common/Loading/Loading";
import SpacecraftCard from "../../components/spacecraft/SpacecraftCard/SpacecraftCard";
import SpacecraftToggle from "../../components/spacecraft/SpacecraftToggle/SpacecraftToggle";

import { fetchSpacecrafts } from "../../features/spacecrafts/spacecraftThunks";
import {
  selectAllSpacecrafts,
  selectDecommissionedSpacecrafts,
  selectSpacecraftError,
  selectSpacecraftLoading,
} from "../../features/spacecrafts/spacecraftSelectors";

function AllSpacecraftsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spacecrafts = useSelector(selectAllSpacecrafts);
  const decommissionedSpacecrafts = useSelector(
    selectDecommissionedSpacecrafts,
  );
  const error = useSelector(selectSpacecraftError);
  const isLoading = useSelector(selectSpacecraftLoading);

  const [showDecommissioned, setShowDecommissioned] = useState(false);

  useEffect(() => {
    if (!spacecrafts.length) {
      dispatch(fetchSpacecrafts());
    }
  }, [dispatch, spacecrafts.length]);

  const displayedSpacecrafts = showDecommissioned
    ? decommissionedSpacecrafts
    : spacecrafts;

  const emptyStateTitle = showDecommissioned
    ? "No decommissioned spacecrafts"
    : "No spacecrafts yet";

  const emptyStateMessage = showDecommissioned
    ? "No spacecrafts have been decommissioned."
    : "Build your first spacecraft to begin the mission.";

  function handleBuildNavigate() {
    navigate("build");
  }

  function handleToggleView() {
    setShowDecommissioned((prev) => !prev);
  }

  function handleRetry() {
    dispatch(fetchSpacecrafts());
  }

  if (isLoading) {
    return <Loading message="Loading spacecraft fleet..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load spacecrafts"
        message={error || "We couldn’t load the fleet. Please try again."}
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    );
  }

  if (!displayedSpacecrafts.length) {
    return (
      <div className={styles.allSpacecraftsPage}>
        <h1>Spacecrafts</h1>

        <Button onClick={handleBuildNavigate}>Build New Spacecraft</Button>

        <SpacecraftToggle
          isShowingDecommissioned={showDecommissioned}
          onToggle={handleToggleView}
        />

        <EmptyState
          title={emptyStateTitle}
          message={emptyStateMessage}
          action={
            !showDecommissioned ? (
              <Button onClick={handleBuildNavigate}>Build Spacecraft</Button>
            ) : null
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.allSpacecraftsPage}>
      <h1>Spacecrafts</h1>

      <div className={styles.actionGroup}>
        <Button onClick={handleBuildNavigate}>Build New Spacecraft</Button>

        <SpacecraftToggle
          isShowingDecommissioned={showDecommissioned}
          onToggle={handleToggleView}
        />
      </div>

      <div className={styles.spacecraftGrid}>
        {displayedSpacecrafts.map((ship) => (
          <SpacecraftCard
            key={ship.id}
            spacecraft={ship}
            showActions={!showDecommissioned}
          />
        ))}
      </div>
    </div>
  );
}

export default AllSpacecraftsPage;
