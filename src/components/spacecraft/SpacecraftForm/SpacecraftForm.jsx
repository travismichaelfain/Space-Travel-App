import { useEffect, useState } from "react";
import styles from "./SpacecraftForm.module.css";

import Button from "../../common/Button/Button";

const MIN_CAPACITY = 1;
const MAX_CAPACITY = 10000;

const defaultValues = {
  name: "",
  description: "",
  capacity: "",
  pictureUrl: "",
};

function validateForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required.";
  }

  if (formData.capacity === "" || formData.capacity === null) {
    errors.capacity = "Capacity is required.";
  } else {
    const capacity = Number(formData.capacity);

    if (Number.isNaN(capacity)) {
      errors.capacity = "Capacity must be a number.";
    } else if (capacity < MIN_CAPACITY) {
      errors.capacity = `Capacity must be at least ${MIN_CAPACITY}.`;
    } else if (capacity > MAX_CAPACITY) {
      errors.capacity = `Capacity cannot exceed ${MAX_CAPACITY}.`;
    }
  }

  return errors;
}

function SpacecraftForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel = "Submit",
}) {
  const [formData, setFormData] = useState(() => ({
    ...defaultValues,
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...defaultValues,
      ...initialValues,
    });
    setErrors({});
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      pictureUrl: formData.pictureUrl.trim(),
      capacity: Number(formData.capacity),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
      </div>

      <div>
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description ? (
          <p className={styles.error}>{errors.description}</p>
        ) : null}
      </div>

      <div>
        <input
          className={styles.input}
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          min={MIN_CAPACITY}
          max={MAX_CAPACITY}
          aria-invalid={Boolean(errors.capacity)}
        />
        {errors.capacity ? (
          <p className={styles.error}>{errors.capacity}</p>
        ) : null}
      </div>

      <div>
        <input
          className={styles.input}
          type="url"
          name="pictureUrl"
          placeholder="Image URL"
          value={formData.pictureUrl || ""}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}

export default SpacecraftForm;
