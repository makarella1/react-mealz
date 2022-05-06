import { useRef, useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";

import { Input } from "../../UI/Input";

import styles from "./MealItem.module.scss";
import { BsPlusLg } from "react-icons/bs";

export const MealItem = ({ name, price, description, id }) => {
  const { addItem } = useContext(CartContext);

  const [amountIsValid, setAmountIsValid] = useState(true);

  const inputRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const amount = inputRef.current.value;
    const amountNumber = +inputRef.current.value;

    if (amountNumber > 5 || amountNumber < 1 || amount.trim().length === 0) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
      addItem({ name, price, id, amount: amountNumber });
    }
  };

  const convertedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.item}>
      <div>
        <h3 className={styles["item-title"]}>{name}</h3>
        <p>{description}</p>
        <p className={styles["item-price"]}>{convertedPrice}</p>
      </div>
      <div>
        <form>
          <Input
            ref={inputRef}
            label="Amount"
            input={{
              type: "number",
              id: "amount",
              min: "1",
              max: "10",
              step: "1",
              defaultValue: "1",
            }}
          />
          <button className={styles.button} onClick={submitHandler}>
            <BsPlusLg fill="white"></BsPlusLg>
          </button>
          {!amountIsValid && (
            <p style={{ color: "red", textAlign: "center" }}>
              Please provide
              <br /> a valid amount
              <br /> (1-5)
            </p>
          )}
        </form>
      </div>
    </li>
  );
};
