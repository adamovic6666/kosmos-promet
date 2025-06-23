"use client";
import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "solid",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "ghost" | "solid";
}) => {
  return (
    <button
      className={`${styles.Button} ${disabled ? styles.Disabled : ""} ${
        type === "ghost" ? styles.Ghost : "button-red"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
