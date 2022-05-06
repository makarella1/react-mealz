import styles from "./CartItem.module.scss";

export const CartItem = ({ name, price, amount, onAdd, onRemove }) => {
  const convertedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.item}>
      <div className={styles.summary}>
        <span className={styles.title}>{name}</span>
        <span className={styles.price}>{convertedPrice}</span>
        <span className={styles.amount}>x {amount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={onAdd}>+</button>
        <button onClick={onRemove}>-</button>
      </div>
    </li>
  );
};
