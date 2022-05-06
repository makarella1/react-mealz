import mealsImg from "../../assets/meals.jpg";
import styles from "./Header.module.scss";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = ({ onCartOpened }) => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ReactMealz</h1>
        <HeaderCartButton onCartClicked={onCartOpened} />
      </header>
      <div className={styles["image-container"]}>
        <img src={mealsImg} />
      </div>
    </>
  );
};
