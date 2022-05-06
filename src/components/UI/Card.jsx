import styles from "./Card.module.scss";

export const Card = ({ children, className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};
