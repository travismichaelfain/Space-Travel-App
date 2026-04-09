import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./DashboardPage.module.css";

import MissionProgress from "../../components/dashboard/MissionProgress/MissionProgress";
import GameStatsPanel from "../../components/dashboard/GameStatsPanel/GameStatsPanel";
import Button from "../../components/common/Button/Button";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import EmptyState from "../../components/common/EmptyState/EmptyState";

import {
  selectAllPlanets,
  selectEarth,
  selectPlanetLoading,
  selectPlanetError,
} from "../../features/planets/planetsSelectors";
import {
  selectAllSpacecrafts,
  selectDecommissionedSpacecrafts,
} from "../../features/spacecrafts/spacecraftSelectors";

import { fetchPlanets } from "../../features/planets/planetThunks";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const planets = useSelector(selectAllPlanets);
  const earth = useSelector(selectEarth);
  const isLoading = useSelector(selectPlanetLoading);
  const error = useSelector(selectPlanetError);
  const spacecrafts = useSelector(selectAllSpacecrafts);
  const decommissionedSpacecrafts = useSelector(
    selectDecommissionedSpacecrafts,
  );

  useEffect(() => {
    if (!planets.length) {
      dispatch(fetchPlanets());
    }
  }, [dispatch, planets.length]);

  const earthPopulation = earth?.currentPopulation;
  const startingPopulation = earth?.maxPopulation;
  const evacuatedPopulation = earth
    ? earth.maxPopulation - earth.currentPopulation
    : 0;

  function handleDispatchNavigate() {
    navigate("/app/planets", { state: { isDispatching: true } });
  }

  function handleBuildNavigate() {
    navigate("/app/spacecrafts/build");
  }

  if (isLoading) return <Loading message="Loading mission data..." />;

  if (error) {
    return (
      <ErrorState
        title="Failed to load mission data"
        message="We couldn’t load planetary data. Please try again."
        action={<Button onClick={() => dispatch(fetchPlanets())}>Retry</Button>}
      />
    );
  }

  if (!planets.length) {
    return (
      <EmptyState
        title="No planetary data available"
        message="We couldn’t find any planets to display."
        action={
          <Button onClick={() => dispatch(fetchPlanets())}>Reload Data</Button>
        }
      />
    );
  }

  return (
    <div className={styles.dashboardPage}>
      <MissionProgress
        earthPopulation={earthPopulation}
        startingPopulation={startingPopulation}
        evacuatedPopulation={evacuatedPopulation}
      />

      <GameStatsPanel
        spacecrafts={spacecrafts}
        planets={planets}
        decommissionedSpacecrafts={decommissionedSpacecrafts}
      />
      <div className={styles.buttonGroup}>
        <h3 className={styles.buttonGroupTitle}>Quick Actions</h3>

        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            variant="primary"
            onClick={handleDispatchNavigate}
          >
            Dispatch Spacecraft
          </Button>

          <Button
            className={styles.button}
            variant="secondary"
            onClick={handleBuildNavigate}
          >
            Build Spacecraft
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
