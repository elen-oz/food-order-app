import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/cartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

//styles
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)} SEK`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = (userData) => {
    fetch(
      'https://food-order-app-9b4ad-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={props.onClose}
        className={classes['button--alt']}
      >
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={orderHandler}
        >
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
