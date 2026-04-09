import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./SpacecraftPage.module.css";

import Button from "../../components/common/Button/Button";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Loading from "../../components/common/Loading/Loading";

import { fetchSpacecrafts } from "../../features/spacecrafts/spacecraftThunks";
import {
  selectAllSpacecrafts,
  selectAnySpacecraftById,
  selectSpacecraftError,
  selectSpacecraftLoading,
} from "../../features/spacecrafts/spacecraftSelectors";

function SpacecraftPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const spacecrafts = useSelector(selectAllSpacecrafts);
  const spacecraft = useSelector((state) => selectAnySpacecraftById(state, id));
  const isLoading = useSelector(selectSpacecraftLoading);
  const error = useSelector(selectSpacecraftError);

  // Effects
  useEffect(() => {
    if (!spacecrafts.length) {
      dispatch(fetchSpacecrafts());
    }
  }, [dispatch, spacecrafts.length]);

  // Handlers
  function handleBackNavigate() {
    navigate(-1);
  }

  function handleRetry() {
    dispatch(fetchSpacecrafts());
  }

  // UI states
  if (isLoading) {
    return <Loading message="Loading spacecraft details..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load spacecraft"
        message={error || "We couldn’t load this spacecraft. Please try again."}
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    );
  }

  if (!spacecraft) {
    return (
      <EmptyState
        title="Spacecraft not found"
        message="This spacecraft does not exist or may have been removed."
        action={
          <Button onClick={() => navigate("/app/spacecrafts")}>
            Back to Spacecrafts
          </Button>
        }
      />
    );
  }

  const { name, description, pictureUrl } = spacecraft;

  return (
    <div className={styles.spacecraftPage}>
      <Button className={styles.backButton} onClick={handleBackNavigate}>
        Back
      </Button>

      <div>
        <h1>{name}</h1>
        <img
          src={pictureUrl}
          alt={`Image of ${name}`}
          className={styles.spacecraftImage}
        />
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SpacecraftPage;
