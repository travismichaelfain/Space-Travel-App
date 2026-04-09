import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SpacecraftBuilderPage.module.css";

import Button from "../../components/common/Button/Button";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Loading from "../../components/common/Loading/Loading";
import SpacecraftForm from "../../components/spacecraft/SpacecraftForm/SpacecraftForm";

import {
  selectSpacecraftError,
  selectSpacecraftLoading,
} from "../../features/spacecrafts/spacecraftSelectors";
import { buildSpacecraft } from "../../features/spacecrafts/spacecraftThunks";

const MAX_CAPACITY = 10000;

const initialValues = {
  name: "",
  description: "",
  capacity: "",
  pictureUrl: "",
};

function SpacecraftBuilderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectSpacecraftLoading);
  const error = useSelector(selectSpacecraftError);

  function handleBackNavigate() {
    navigate(-1);
  }

  function handleSubmit(data) {
    const capacity = Number(data.capacity);

    if (!Number.isFinite(capacity) || capacity < 1 || capacity > MAX_CAPACITY) {
      return;
    }

    dispatch(
      buildSpacecraft({
        ...data,
        capacity,
      }),
    );

    navigate("/app/spacecrafts");
  }

  if (isLoading) {
    return <Loading message="Building spacecraft..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to build spacecraft"
        message={error || "Something went wrong while building the spacecraft."}
        action={<Button onClick={handleBackNavigate}>Back</Button>}
      />
    );
  }

  return (
    <div className={styles.spacecraftBuilderPage}>
      <div className={styles.header}>
        <Button onClick={handleBackNavigate}>Back</Button>
        <h1 className={styles.title}>Build Spacecraft</h1>
      </div>

      <SpacecraftForm
        initialValues={initialValues}
        submitLabel="Build Spacecraft"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SpacecraftBuilderPage;
