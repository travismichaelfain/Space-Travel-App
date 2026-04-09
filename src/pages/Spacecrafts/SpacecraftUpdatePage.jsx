import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SpacecraftUpdatePage.module.css";

import Button from "../../components/common/Button/Button";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import SpacecraftForm from "../../components/spacecraft/SpacecraftForm/SpacecraftForm";

import { updateSpacecraft } from "../../features/spacecrafts/spacecraftSlice";
import {
  selectSpacecraftById,
  selectSpacecraftLoading,
  selectSpacecraftError,
} from "../../features/spacecrafts/spacecraftSelectors";

const MAX_CAPACITY = 10000;

function SpacecraftUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spacecraft = useSelector((state) => selectSpacecraftById(state, id));
  const isLoading = useSelector(selectSpacecraftLoading);
  const error = useSelector(selectSpacecraftError);

  const initialValues = spacecraft
    ? {
        name: spacecraft.name,
        description: spacecraft.description,
        capacity: spacecraft.capacity,
        pictureUrl: spacecraft.pictureUrl,
      }
    : null;

  function handleSubmit(data) {
    const capacity = Number(data.capacity);

    if (!Number.isFinite(capacity) || capacity < 1 || capacity > MAX_CAPACITY) {
      return;
    }

    dispatch(
      updateSpacecraft({
        id,
        ...data,
        capacity,
      }),
    );

    navigate(-1);
  }

  function handleBackNavigate() {
    navigate(-1);
  }

  if (isLoading) {
    return <Loading message="Loading spacecraft..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load spacecraft"
        message={error || "We couldn’t load this spacecraft. Please try again."}
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

  return (
    <div className={styles.spacecraftUpdatePage}>
      <div className={styles.header}>
        <Button onClick={handleBackNavigate}>Back</Button>
        <h1 className={styles.title}>Update Spacecraft</h1>
      </div>

      <SpacecraftForm
        initialValues={initialValues}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SpacecraftUpdatePage;
