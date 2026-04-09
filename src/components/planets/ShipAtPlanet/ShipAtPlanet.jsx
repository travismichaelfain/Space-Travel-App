import { useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button";

import styles from "./ShipAtPlanet.module.css";

function ShipAtPlanet({ id, name, capacity, pictureUrl }) {
  const navigate = useNavigate();

  function handleDispatch() {
    navigate("/app/planets", {
      state: {
        isDispatching: true,
        selectedSpacecraftId: id,
      },
    });
  }

  return (
    <li className={styles.shipAtPlanet}>
      <h3>{name}</h3>

      <p>Capacity: {capacity}</p>

      <img src={pictureUrl} alt={`Image of ${name}`} />

      <Button variant="secondary" onClick={handleDispatch}>
        Dispatch Spacecraft
      </Button>
    </li>
  );
}

export default ShipAtPlanet;
