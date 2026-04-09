import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectMissionStatus } from "../features/planets/planetsSelectors";

function MissionStatusGate() {
  const missionStatus = useSelector(selectMissionStatus);

  if (missionStatus === "success") {
    return <Navigate to="/mission-success" replace />;
  }

  return <Outlet />;
}

export default MissionStatusGate;
