import { useEffect, useState } from 'react';
import { Card } from '../UI/Card';
import { MealItem } from './MealItem/MealItem';
import { SquareLoader } from 'react-spinners';
import { css } from '@emotion/react';
import styles from './MealsList.module.scss';

const override = css`
  margin: 120px auto;
  display: block;
`;

export const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetch(
        'https://react-mealz-dec87-default-rtdb.firebaseio.com/meals.json'
      );

      if (!result.ok) {
        throw new Error('Something went wrong...');
      } else {
        const mealsData = await result.json();

        const mealsArr = [];

        for (const key in mealsData) {
          mealsArr.push(mealsData[key]);
        }

        setMeals(mealsArr);

        setIsLoading(false);
      }
    };

    fetchAndSetData().catch((error) => {
      setIsLoading(false);
      setFetchError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = (
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  );

  if (isLoading) {
    content = (
      <SquareLoader
        loading={isLoading}
        size={120}
        color={'#fff'}
        css={override}
      />
    );
  }

  if (fetchError) {
    content = (
      <Card>
        <p style={{ color: 'red', textAlign: 'center' }}>{fetchError}</p>
      </Card>
    );
  }

  return <section className={styles.meals}>{content}</section>;
};
