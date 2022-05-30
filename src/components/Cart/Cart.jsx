import { useContext, useState } from 'react';

import { CartContext } from '../../store/cart-context';

import { Modal } from '../UI/Modal';
import { CartItem } from './CartItem';
import { OrderForm } from './OrderForm';

import { SkewLoader } from 'react-spinners';
import { css } from '@emotion/react';

import styles from './Cart.module.scss';

const override = css`
  display: block;
  margin: 0 auto;
`;

export const Cart = ({ onCartClosed }) => {
  const { totalAmount, items, addItem, removeItem, clearCart } =
    useContext(CartContext);

  const hasItems = items.length > 0;

  const [formIsOpened, setFormIsOpened] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const openFormHandler = () => {
    setFormIsOpened(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsOrdering(true);
    try {
      await fetch(
        'https://react-mealz-dec87-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            order: items,
          }),
        }
      );
      clearCart();
      setIsOrdering(false);
      setIsOrdered(true);
    } catch (e) {
      console.log(e);
    }
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
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

  const modalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{convertedTotalAmount}</span>
      </div>
      <div className={styles.actions}>
        {!formIsOpened && (
          <button className={styles['close-btn']} onClick={onCartClosed}>
            Close
          </button>
        )}
        {hasItems && !formIsOpened && (
          <button onClick={openFormHandler} className={styles['order-btn']}>
            Order
          </button>
        )}
      </div>
      {hasItems && formIsOpened && (
        <OrderForm
          onSubmitOrder={submitOrderHandler}
          onOrderCanceled={onCartClosed}
        />
      )}
    </>
  );

  return (
    <Modal onBackdropClicked={onCartClosed}>
      {!isOrdering && !isOrdered && modalContent}
      {isOrdering && !isOrdered && (
        <SkewLoader loading={isOrdering} css={override} />
      )}
      {!isOrdering && isOrdered && (
        <div className="text-center">
          <p className="font-bold mb-2">
            Your order will be processed as soon as possible! Thank you!
          </p>
          <button
            className="px-6 py-2 border border-[#8a2b06] rounded-2xl font-semibold hover:bg-[#5a1a01] hover:text-white text-[#8a2b06]"
            onClick={onCartClosed}
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};
