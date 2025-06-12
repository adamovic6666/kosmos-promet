"use client";
import styles from "./Input.module.css";
import { Control, Controller } from "react-hook-form";

const Input = ({
  name,
  control,
  type = "text",
  inputType,
  placeholder = "",
}: {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  type?: string;
  inputType?: string;
  placeholder?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderInput = ({ field, fieldState }: any) => {
    return (
      <>
        {inputType === "textarea" ? (
          <textarea
            {...field}
            type={type}
            id={name}
            data-text={field.value || ""}
            placeholder={placeholder}
          />
        ) : (
          <input
            {...field}
            type={type}
            id={name}
            value={field.value || ""}
            placeholder={placeholder}
          />
        )}
        {fieldState.error && (
          <span className={styles.InputError}>{fieldState.error.message}</span>
        )}
      </>
    );
  };

  return (
    <div className={styles.InputWrapper}>
      <Controller name={name} control={control} render={renderInput} />
    </div>
  );
};

export default Input;
