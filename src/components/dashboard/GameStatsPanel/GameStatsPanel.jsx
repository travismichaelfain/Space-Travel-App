import GameStatsCard from "../GameStatsCard/GameStatsCard";
import FleetActivityStat from "../FleetActivityStat/FleetActivityStat";
import FleetUsageStat from "../FleetUsageStat/FleetUsageStat";
import CapacityOverviewStat from "../CapacityOverviewStat/CapacityOverviewStat";

import styles from "./GameStatsPanel.module.css";

function GameStatsPanel({ spacecrafts, planets, decommissionedSpacecrafts }) {
  const voyages = spacecrafts.reduce(
    (total, craft) => total + craft.travelLog.length,
    0,
  );

  const spacecraftsBuilt =
    spacecrafts.length + decommissionedSpacecrafts.length;

  const activeSpacecrafts = spacecrafts.reduce(
    (total, craft) => (craft.travelLog.length > 0 ? total + 1 : total),
    0,
  );

  const totalSpacecrafts = spacecrafts.length;

  const utilizationRate = totalSpacecrafts
    ? ((activeSpacecrafts / totalSpacecrafts) * 100).toFixed(2)
    : 0;

  const { mostAvailable, leastAvailable } = planets.reduce(
    (acc, planet) => {
      const available = planet.maxPopulation - planet.currentPopulation;
      const percent = planet.maxPopulation
        ? (available / planet.maxPopulation) * 100
        : 0;

      const planetData = {
        id: planet.id,
        name: planet.name,
        percent: percent.toFixed(2),
        availablePopulation: available,
      };

      if (!acc.mostAvailable || percent > acc.mostAvailable.rawPercent) {
        acc.mostAvailable = { ...planetData, rawPercent: percent };
      }

      if (!acc.leastAvailable || percent < acc.leastAvailable.rawPercent) {
        acc.leastAvailable = { ...planetData, rawPercent: percent };
      }

      return acc;
    },
    { mostAvailable: null, leastAvailable: null },
  );

  return (
    <div className={styles.gameStatsPanel}>
      <GameStatsCard title="Fleet Activity">
        <FleetActivityStat
          voyages={voyages}
          spacecraftsBuilt={spacecraftsBuilt}
          decommissionedSpacecrafts={decommissionedSpacecrafts.length}
        />
      </GameStatsCard>

      <GameStatsCard title="Fleet Utilization Rate">
        <FleetUsageStat
          utilizationRate={utilizationRate}
          activeSpacecrafts={activeSpacecrafts}
          totalSpacecrafts={totalSpacecrafts}
        />
      </GameStatsCard>

      <GameStatsCard title="Capacity Overview">
        <CapacityOverviewStat
          mostAvailable={mostAvailable}
          leastAvailable={leastAvailable}
        />
      </GameStatsCard>
    </div>
  );
}

export default GameStatsPanel;
