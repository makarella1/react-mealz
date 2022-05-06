import { forwardRef, useRef, useImperativeHandle } from "react";

import styles from "./Input.module.scss";

export const Input = forwardRef(({ label, input }, ref) => {
  const inputRef = useRef(null);

  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});
