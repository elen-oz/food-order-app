import { useReducer } from 'react';
import CartContext from './cartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  switch (action.type) {
    case 'ADD':
      // let updatedItems;
      if (state.items.find((item) => item.id === action.payload.id)) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + action.payload.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.amount * action.payload.price,
      };
    case 'REMOVE':
      const itemToRemove = state.items.find((item) => item.id === action.payload);

      const updatedAmount = itemToRemove.amount === 1 ? 0 : itemToRemove.amount - 1;
      updatedItems = state.items
        .map((item) => (item.id === action.payload ? { ...item, amount: updatedAmount } : item))
        .filter((item) => item.amount > 0);
      return {
        items: updatedItems,
        totalAmount: state.totalAmount - itemToRemove.price,
      };
    case 'CLEAR':
      return defaultCartState;

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      payload: item,
    });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      payload: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
