import { useState, useEffect } from 'react';
import CartContext from './CartContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const CartProvider = ({ children }) => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('cart_count');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  const [cartItem, setCartItem] = useState(() => {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(cartItem));
        localStorage.setItem("cart_count", JSON.stringify(count));
    }, [cartItem, count]);

  const addToCart = (item) => {
    const exists = cartItem.find((cart) => cart._id === item._id);
    if (exists) {
      toast.warning('Product already in cart!', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'dark',
      });
    } else {
      setCartItem((prevItem) => [...prevItem, item]);
      setCount((prevCount) => prevCount + 1);
      toast.success('Product added to cart!', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'dark',
      });
    }
  };
  const removeFromCart = (id) => {
    setCartItem((prevItem) => prevItem.filter((item) => item._id !== id));
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    toast.info('Product removed from cart!', {
      position: 'top-center',
      autoClose: 1000,
      theme: 'dark',
    });
  };
  return (
    <CartContext.Provider
      value={{ count, cartItem, addToCart, removeFromCart }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
export default CartProvider;
