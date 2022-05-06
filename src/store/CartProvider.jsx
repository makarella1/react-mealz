import { CartContext } from "./cart-context";
import { useReducer } from "react";

const CART_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const { item, id } = action.payload;

  switch (action.type) {
    case CART_ACTIONS.ADD:
      const updatedAmount = state.totalAmount + item.amount * item.price;

      const existingCartItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: item.amount + existingCartItem.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };

    case CART_ACTIONS.REMOVE:
      const itemToRemoveIndex = state.items.findIndex(
        (cartItem) => cartItem.id === id
      );
      const itemToRemove = state.items[itemToRemoveIndex];

      const updatedTotalAmount = state.totalAmount - itemToRemove.price;

      let newItems;

      if (itemToRemove.amount === 1) {
        newItems = state.items.filter((cartItem) => cartItem.id !== id);
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        newItems = [...state.items];
        newItems[itemToRemoveIndex] = updatedItem;
      }

      return {
        items: newItems,
        totalAmount: updatedTotalAmount,
      };

    default:
      return defaultCartState;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatch({ type: CART_ACTIONS.ADD, payload: { item } });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: { id } });
  };

  const cartContext = {
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
