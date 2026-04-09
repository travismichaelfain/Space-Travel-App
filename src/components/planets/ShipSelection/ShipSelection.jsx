import styles from "./ShipSelection.module.css";

const ShipSelection = ({ spacecrafts, selectedSpacecraftId, onSelectShip }) => {
  const handleChange = (evt) => {
    const value = evt.target.value;
    onSelectShip(value === "" ? null : value);
  };

  return (
    <div className={styles.shipSelection}>
      <label htmlFor="ship-select" className={styles.label}>
        Select a ship
      </label>

      <select
        id="ship-select"
        className={styles.select}
        value={selectedSpacecraftId ?? ""}
        onChange={handleChange}
      >
        <option value="">Select a ship</option>

        {spacecrafts.map((ship) => (
          <option key={ship.id} value={ship.id}>
            {ship.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShipSelection;
