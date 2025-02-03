import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface TextAreaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextAreaInput: FC<TextAreaInputProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        {...field}
        {...props}
        id={name}
        className={`${styles.input} ${
          meta.touched && meta.error ? styles.error : ""
        }`}
        aria-invalid={meta.touched && !!meta.error}
        aria-describedby={`${name}-error`}
      />
      {meta.touched && meta.error ? (
        <div id={`${name}-error`} className={styles.errorMessage}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextAreaInput;
