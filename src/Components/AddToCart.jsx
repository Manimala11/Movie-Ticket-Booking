import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css"
import { useContext} from 'react'
import CartContext from '../Context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css';

const AddToCart = () => {
  const { cartItem, removeFromCart } = useContext(CartContext)
  const Add= cartItem.reduce((total, movie)=> total+movie.ticketprice, 0)
  if(cartItem.length===0){
    return(
      <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
        <h2 className='text-warning'>Your cart is empty.</h2>
      </div>
    );
  }
  return(
  <div className="bg-dark min-vh-100 text-white">
      <div className="container py-5">
        <h1 className="text-warning mb-5 text-center">Your Cart</h1>
        <div className="row">
          {cartItem.map((movie) => (
            <div className="col-md-4 col-lg-3 mb-4" key={movie._id}>
              <div className="card bg-dark text-white border-warning h-100">
                <img src={movie.image} className="card-img-top" alt={movie.name} height="250"/>
                <div className="card-body">
                  <h5 className="card-title">{movie.name}</h5>
                  <p><b>Director:</b> {movie.director}</p>
                  <p className="text-warning"><b>Price:</b> ₹{movie.ticketprice}</p>
                </div>
                <div className='card-footer p-0'>
                  <button className='btn w-100 rounded-0 py-2 btn-warning text-white' onClick={()=> removeFromCart(movie._id)}> REMOVE FROM CART</button>
                </div>
              </div>
            </div>
          ))}
          <p>Total Amount: {Add}</p>
        </div>
      </div>
    </div>
  )
}

export default AddToCart