import { useContext } from "react";

import { CartContext } from "../../store/cart-context";

import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";

import styles from "./Cart.module.scss";

export const Cart = ({ onCartClosed }) => {
  const { totalAmount, items, addItem, removeItem } = useContext(CartContext);

  const hasItems = items.length > 0;

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <CartItem
          onAdd={addItem.bind(null, item)}
          onRemove={removeItem.bind(null, item.id)}
          key={item.id}
          {...item}
        />
      ))}
    </ul>
  );

  const convertedTotalAmount = `$${totalAmount.toFixed(2)}`;

  return (
    <Modal onBackdropClicked={onCartClosed}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{convertedTotalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["close-btn"]} onClick={onCartClosed}>
          Close
        </button>
        {hasItems && <button className={styles["order-btn"]}>Order</button>}
      </div>
    </Modal>
  );
};
