import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "./AllPlanetsPage.module.css";

import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Loading from "../../components/common/Loading/Loading";
import DispatchMenu from "../../components/planets/DispatchMenu/DispatchMenu";
import PlanetCard from "../../components/planets/PlanetCard/PlanetCard";

import { fetchPlanets } from "../../features/planets/planetThunks";
import {
  selectAllPlanets,
  selectPlanetError,
  selectPlanetLoading,
} from "../../features/planets/planetsSelectors";
import {
  fetchSpacecrafts,
  sendSpacecraftToPlanet,
} from "../../features/spacecrafts/spacecraftThunks";
import {
  selectAllSpacecrafts,
  selectSpacecraftError,
  selectSpacecraftLoading,
} from "../../features/spacecrafts/spacecraftSelectors";

function AllPlanetsPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const planets = useSelector(selectAllPlanets);
  const planetError = useSelector(selectPlanetError);
  const planetsLoading = useSelector(selectPlanetLoading);
  const spacecrafts = useSelector(selectAllSpacecrafts);
  const spacecraftError = useSelector(selectSpacecraftError);
  const spacecraftsLoading = useSelector(selectSpacecraftLoading);

  const [isDispatching, setIsDispatching] = useState(false);
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  useEffect(() => {
    if (location.state?.isDispatching) {
      setIsDispatching(true);
      setSelectedSpacecraftId(location.state.selectedSpacecraftId ?? null);
    }
  }, [location.state]);

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
    return spacecrafts.reduce((acc, spacecraft) => {
      const planetId = spacecraft.currentLocation;
      acc[planetId] = (acc[planetId] || 0) + 1;
      return acc;
    }, {});
  }, [spacecrafts]);

  const selectedSpacecraft =
    selectedSpacecraftId !== null
      ? spacecrafts.find((spacecraft) => spacecraft.id === selectedSpacecraftId)
      : null;

  const selectedPlanet =
    selectedPlanetId !== null
      ? planets.find((planet) => planet.id === selectedPlanetId)
      : null;

  const originPlanet =
    selectedSpacecraft !== null
      ? planets.find(
          (planet) => planet.id === selectedSpacecraft.currentLocation,
        )
      : null;

  const transferredPopulation =
    selectedSpacecraft && originPlanet
      ? Math.min(selectedSpacecraft.capacity, originPlanet.currentPopulation)
      : 0;

  const isPreviewActive =
    selectedSpacecraft !== null &&
    selectedPlanet !== null &&
    originPlanet !== null;

  const isLoading = planetsLoading || spacecraftsLoading;
  const error = planetError || spacecraftError || null;

  function isPlanetSelectable(planet, spacecraftCount) {
    if (!isDispatching) return true;
    if (!selectedSpacecraft || !originPlanet) return false;

    return (
      planet.id !== selectedSpacecraft.currentLocation &&
      spacecraftCount < planet.maxShipsAllowed &&
      planet.maxPopulation - planet.currentPopulation >= transferredPopulation
    );
  }

  function getPreviewPlanetState(planet, spacecraftCount) {
    const preview = {
      population: planet.currentPopulation,
      shipCount: spacecraftCount,
      isPreviewOrigin: false,
      isPreviewTarget: false,
      isAffected: false,
    };

    if (!isPreviewActive) return preview;

    if (planet.id === originPlanet.id) {
      preview.population = planet.currentPopulation - transferredPopulation;
      preview.shipCount = spacecraftCount - 1;
      preview.isPreviewOrigin = true;
      preview.isAffected = true;
    }

    if (planet.id === selectedPlanet.id) {
      preview.population = planet.currentPopulation + transferredPopulation;
      preview.shipCount = spacecraftCount + 1;
      preview.isPreviewTarget = true;
      preview.isAffected = true;
    }

    return preview;
  }

  function handleOpenDispatch() {
    setIsDispatching(true);
  }

  function handleCloseDispatch() {
    setIsDispatching(false);
    setSelectedSpacecraftId(null);
    setSelectedPlanetId(null);
  }

  function handleSelectSpacecraft(spacecraftId) {
    setSelectedSpacecraftId(spacecraftId);
    setSelectedPlanetId(null);
  }

  function handleSelectPlanet(planetId) {
    setSelectedPlanetId(planetId);
  }

  function handleDispatchSpacecraft() {
    if (selectedSpacecraftId === null || selectedPlanetId === null) return;

    dispatch(
      sendSpacecraftToPlanet({
        spacecraftId: selectedSpacecraftId,
        targetPlanetId: selectedPlanetId,
      }),
    );

    setSelectedSpacecraftId(null);
    setSelectedPlanetId(null);
  }

  function handleRetry() {
    dispatch(fetchPlanets());
    dispatch(fetchSpacecrafts());
  }

  if (isLoading) {
    return <Loading message="Loading planetary data..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load mission data"
        message={
          error || "We couldn’t load the planetary view. Please try again."
        }
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    );
  }

  if (!planets.length) {
    return (
      <EmptyState
        title="No planets available"
        message="There are no planets to display right now."
        action={<Button onClick={handleRetry}>Reload Data</Button>}
      />
    );
  }

  return (
    <div
      className={`${styles.allPlanetsPage} ${
        isDispatching ? styles.dispatchOpen : ""
      }`}
    >
      <h1>Planets</h1>

      <Button onClick={handleOpenDispatch}>Dispatch Spacecraft</Button>

      <div className={styles.planetList}>
        {planets.map((planet) => {
          const spacecraftCount = shipCountsByPlanet[planet.id] || 0;
          const isSelectable = isPlanetSelectable(planet, spacecraftCount);
          const isSelected = selectedPlanetId === planet.id;

          const previewState = getPreviewPlanetState(planet, spacecraftCount);

          const {
            population: previewPopulation,
            shipCount: previewShipCount,
            isPreviewOrigin,
            isPreviewTarget,
            isAffected: isPreviewAffected,
          } = previewState;

          return (
            <PlanetCard
              key={planet.id}
              planet={planet}
              shipCount={spacecraftCount}
              isSelectable={isSelectable}
              isSelected={isSelected}
              onClick={() => {
                if (isSelectable) {
                  handleSelectPlanet(planet.id);
                }
              }}
              previewPopulation={previewPopulation}
              previewShipCount={previewShipCount}
              isPreviewActive={isPreviewActive}
              isPreviewOrigin={isPreviewOrigin}
              isPreviewTarget={isPreviewTarget}
              isPreviewAffected={isPreviewAffected}
            />
          );
        })}
      </div>

      {isDispatching && (
        <DispatchMenu
          selectedSpacecraftId={selectedSpacecraftId}
          selectedSpacecraft={selectedSpacecraft}
          selectedPlanet={selectedPlanet}
          onClose={handleCloseDispatch}
          onSelectShip={handleSelectSpacecraft}
          spacecrafts={spacecrafts}
          onConfirmDispatch={handleDispatchSpacecraft}
        />
      )}
    </div>
  );
}

export default AllPlanetsPage;
