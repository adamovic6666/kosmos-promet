import { Control, Controller } from "react-hook-form";
import styles from "./Select.module.css";

const Select = ({
  name,
  control,
  label,
  options = [
    "Ponuda za saradnju",
    "Pitanje u vezi proizvoda/usluga",
    "Marketing/PR upit",
    "Tehnička podrška",
    "Nešto drugo",
  ],
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options?: string[] | { value: string; label: string }[];
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div
          className={`${styles.SelectWrapper} ${
            !field.value ? styles.empty : ""
          }`}
        >
          <select
            {...field}
            id={name}
            className={styles.Select}
            value={field.value || ""}
          >
            <option value="" disabled>
              {label}
            </option>
            {options.map((option) => {
              const isString = typeof option === "string";
              const value = isString ? option : option.value;
              const label = isString ? option : option.label;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
          {fieldState.error && (
            <span className={styles.SelectError}>
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Select;
