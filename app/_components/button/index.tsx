import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  variant?: "default" | "ghost"; // Variants for the button
  onClick?: () => void; // Optional click handler
  className?: string; // Additional custom styles
  children: ReactNode; // Button label or content
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "default",
  onClick,
  className,
  children,
  type = "button",
  disabled,
}) => {
  const buttonClass = `${styles.button} ${
    variant === "ghost" ? styles.ghostButton : ""
  } ${disabled ? styles.disabled : ""} ${className || ""}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
