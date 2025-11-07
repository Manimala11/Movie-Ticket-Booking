import { useContext, useEffect,  useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import CartContext from '../Context/CartContext'

function Main() {
  const [data, setData] = useState([])
  const {addToCart} = useContext(CartContext)

  useEffect(()=>{
    const fetchData = async () => {
      
        const response =  await fetch('https://backend-crud-one.vercel.app/product');
        const movies= await response.json();
        setData(movies)

    };
    fetchData();
  },[])

  return (
    <div className='bg-dark min-vh-100'>
      <div className='container py-5'>
        <h1 className='text-warning mb-5 text-center'>Movie Ticket Booking</h1>
        <div className="row g-4">
          {data.map((movie)=>
            
            <div className="col-lg-3 col-md-4 d-flex" key={movie._id}>
              <div className="card bg-dark text-white border-warning flex-fill d-flex flex-column">
                <Link to={`/card/${movie._id}`} style={{textDecoration: "none"}} className='text-white'>
                  <img src={movie.image} alt={movie.name} className='card-img-top' height="250"/>
                  <div className="card-body">
                    <h5 className="card-title text-center">{movie.name}</h5>
                    <p><b>Director: </b>{movie.director}</p>
                    <p className='text-warning'><b>Price:  </b>₹{movie.ticketprice}</p>
                  </div>
                </Link>
                <div className="card-footer mt-auto p-0 ">
                  <button className='btn w-100 rounded-0 py-2 btn-warning text-white' onClick={()=> {addToCart(movie);}}>ADD TO CART</button>
                </div>
              </div>
            </div> 
          )}
        </div>      
      </div>
    </div>
  )
}

export default Main;
