import Profile from '../assets/profile.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../Context/CartContext';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const { count, setCartItem, setCount } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const credential = localStorage.getItem('google_credential');
      setIsLoggedIn(!!credential);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_credential');
    setIsLoggedIn(false);
    setCartItem([]);
    setCount(0);
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-1'>
      <div className='container-fluid'>
        <Link className='navbar-brand d-flex align-items-center' to='/'>
          <img
            src={Profile}
            className='rounded-pill'
            alt='Logo'
            height='40'
            width={40}
          />
          <span className='text-warning ms-3' style={{ fontSize: '20px' }}>
            Movie Ticket Booking
          </span>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mynavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
      <div
        className='collapse navbar-collapse justify-content-center'
        id='mynavbar'
      >
        <div className='d-flex align-items-center mt-2 mt-md-0'>
          {!isLoggedIn ? (
            <button
              className='btn border-warning text-warning px-4 py-2'
              onClick={() => navigate('/Login')}
            >
              Login
            </button>
          ) : (
            <button
              className='btn border-danger text-danger px-4 py-2'
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          <button
            className='btn rounded-0 nav-item  btn-black text-white btnposition'
            type='button'
            onClick={() => {
              navigate('/addtocart');
            }}
          >
            <i
              className='bi bi-cart'
              style={{ fontSize: '35px', color: 'yellow' }}
            ></i>
            <span className='countincrease text-warning'>{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
