import styles from "./Input.module.css";
import cn from "classnames";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className, isValid, appearance, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles.input, {
        [styles.invalid]: !isValid,
        [styles["input-title"]]: appearance === "title",
      })}
    />
  );
});

export default Input;
