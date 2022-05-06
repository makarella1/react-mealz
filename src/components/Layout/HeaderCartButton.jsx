import { useContext, useEffect, useState } from "react";

import { FaShoppingCart } from "react-icons/fa";
import styles from "./HeaderCartButton.module.scss";

import { CartContext } from "../../store/cart-context";

export const HeaderCartButton = ({ onCartClicked }) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const { items } = useContext(CartContext);

  const numberOfCartItems = items.reduce(
    (currentNumber, item) => currentNumber + parseInt(item.amount),
    0
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  const btnStyles = `${styles.cart} ${
    btnIsHighlighted ? styles.animation : ""
  }`;

  return (
    <button className={btnStyles} onClick={onCartClicked}>
      <span>
        <FaShoppingCart />
      </span>
      <span className={styles["cart-title"]}>Your Cart</span>
      <div className={styles["cart-amount"]}>{numberOfCartItems}</div>
    </button>
  );
};
