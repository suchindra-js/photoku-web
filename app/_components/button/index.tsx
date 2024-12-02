import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  variant?: "default" | "ghost"; // Variants for the button
  onClick?: () => void; // Optional click handler
  className?: string; // Additional custom styles
  children: ReactNode; // Button label or content
}

const Button: FC<ButtonProps> = ({
  variant = "default",
  onClick,
  className,
  children,
}) => {
  const buttonClass = `${styles.button} ${
    variant === "ghost" ? styles.ghostButton : ""
  } ${className || ""}`.trim();

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
