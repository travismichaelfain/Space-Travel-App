import Button from "../../common/Button/Button";

function SpacecraftToggle({ isShowingDecommissioned, onToggle }) {
  const label = isShowingDecommissioned
    ? "Show Active Spacecraft"
    : "Show Decommissioned Spacecraft";

  return (
    <Button type="button" onClick={onToggle}>
      {label}
    </Button>
  );
}

export default SpacecraftToggle;
