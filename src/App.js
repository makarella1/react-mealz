import { useEffect, useState } from 'react';

import { Header } from './components/Layout/Header';
import { Meals } from './components/Meals/Meals';
import { Cart } from './components/Cart/Cart';

import { CartProvider } from './store/CartProvider';

const App = () => {
  const [сartIsShown, setCartIsShown] = useState(false);

  useEffect(() => {
    if (сartIsShown) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [сartIsShown]);

  const cartOpenedHandler = () => {
    setCartIsShown(true);
  };

  const cartClosedHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {сartIsShown ? <Cart onCartClosed={cartClosedHandler} /> : null}
      <Header onCartOpened={cartOpenedHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
