import styles from "./MealsSummary.module.scss";

export const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Zesty Food, Delivered To You!</h2>
      <p>
        Just pick your favorite meal from the list of available meals below,
        order it and simply wait! We'll take care of fast delivery and also make
        sure that you recieve your order at the snap of a finger! Bon appetit!
      </p>
      <p>
        The freshest ingredients, the coolest chefs, the fastest cooking time
        and you haven't ordered some amazing meal yet?
      </p>
    </section>
  );
};
