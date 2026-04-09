import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./PlanetPage.module.css";

import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Loading from "../../components/common/Loading/Loading";
import PlanetHero from "../../components/planets/PlanetHero/PlanetHero";
import PlanetStats from "../../components/planets/PlanetStats/PlanetStats";
import ShipAtPlanet from "../../components/planets/ShipAtPlanet/ShipAtPlanet";

import { fetchPlanets } from "../../features/planets/planetThunks";
import {
  selectAllPlanets,
  selectPlanetById,
  selectPlanetError,
  selectPlanetLoading,
} from "../../features/planets/planetsSelectors";
import { fetchSpacecrafts } from "../../features/spacecrafts/spacecraftThunks";
import {
  selectAllSpacecrafts,
  selectSpacecraftError,
  selectSpacecraftLoading,
} from "../../features/spacecrafts/spacecraftSelectors";

function PlanetPage() {
  const { id } = useParams();
  const planetId = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const planets = useSelector(selectAllPlanets);
  const planet = useSelector((state) => selectPlanetById(state, planetId));
  const planetsLoading = useSelector(selectPlanetLoading);
  const planetError = useSelector(selectPlanetError);

  const spacecrafts = useSelector(selectAllSpacecrafts);
  const spacecraftsLoading = useSelector(selectSpacecraftLoading);
  const spacecraftError = useSelector(selectSpacecraftError);

  useEffect(() => {
    if (!planets.length) {
      dispatch(fetchPlanets());
    }
  }, [dispatch, planets.length]);

  useEffect(() => {
    if (!spacecrafts.length) {
      dispatch(fetchSpacecrafts());
    }
  }, [dispatch, spacecrafts.length]);

  const shipCountsByPlanet = useMemo(() => {
    return spacecrafts.reduce((acc, ship) => {
      const currentPlanetId = ship.currentLocation;
      acc[currentPlanetId] = (acc[currentPlanetId] || 0) + 1;
      return acc;
    }, {});
  }, [spacecrafts]);

  const shipsAtPlanet = useMemo(() => {
    return spacecrafts.filter((ship) => ship.currentLocation === planetId);
  }, [spacecrafts, planetId]);

  const isLoading = planetsLoading || spacecraftsLoading;
  const error = planetError || spacecraftError || null;

  function handleBackNavigate() {
    navigate(-1);
  }

  function handleRetry() {
    dispatch(fetchPlanets());
    dispatch(fetchSpacecrafts());
  }

  if (isLoading) {
    return <Loading message="Loading planet details..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load planet data"
        message={error || "We couldn’t load this planet. Please try again."}
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    );
  }

  if (!planet) {
    return (
      <EmptyState
        title="Planet not found"
        message="This planet does not exist or may have been removed."
        action={
          <Button onClick={() => navigate("/app/planets")}>
            Back to Planets
          </Button>
        }
      />
    );
  }

  const {
    name,
    description,
    pictureUrl,
    currentPopulation,
    maxPopulation,
    maxShipsAllowed,
  } = planet;

  return (
    <div className={styles.planetPage}>
      <Button
        className={styles.backButton}
        variant="ghost"
        onClick={handleBackNavigate}
      >
        Back
      </Button>

      <PlanetHero
        name={name}
        description={description}
        pictureUrl={pictureUrl}
      />

      <PlanetStats
        population={currentPopulation}
        maxPopulation={maxPopulation}
        currentShips={shipCountsByPlanet[planetId] || 0}
        maxShips={maxShipsAllowed}
      />

      <section className={styles.shipsAtPlanet}>
        <h2 className={styles.dockTitle}>Docked Spacecraft</h2>

        {shipsAtPlanet.length ? (
          <ul className={styles.shipList}>
            {shipsAtPlanet.map((ship) => {
              const { id, name, capacity, pictureUrl } = ship;

              return (
                <ShipAtPlanet
                  key={id}
                  id={id}
                  name={name}
                  capacity={capacity}
                  pictureUrl={pictureUrl}
                />
              );
            })}
          </ul>
        ) : (
          <p className={styles.emptyDock}>No spacecraft currently docked.</p>
        )}
      </section>
    </div>
  );
}

export default PlanetPage;
