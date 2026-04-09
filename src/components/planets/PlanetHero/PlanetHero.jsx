// build a basic compoent structure
import styles from "./PlanetHero.module.css";

const PlanetHero = ({ name, description, pictureUrl }) => {
  return (
    <div className={styles.planetHero}>
      <h1>{name}</h1>
      <img
        src={pictureUrl}
        alt={`Image of: ${name}`}
        className={styles.spacecraftImage}
      />
      <p>{description}</p>
    </div>
  );
};

export default PlanetHero;
