import { useContext, useEffect, useState  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams, useNavigate } from 'react-router-dom'
import CartContext from '../Context/CartContext'

function Card() {
  const [movie, setMovie] = useState(null)
  let { iden } = useParams();
  const navigate = useNavigate();
  const { addToCart} = useContext(CartContext)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://backend-crud-one.vercel.app/product/${iden}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie({ error: "Movie not found or server error." });
      }
    };
    fetchMovie();
  }, [iden]);

  if (!movie) return (
    <div className='d-flex justify-content-center vh-100 bg-dark'>
      <p className='text-center mt-5 text-warning' style={{ fontSize: "50px" }}>Loading...</p>
    </div>);


  return (
    <div className="bg-dark">

      <div className="container">
        <button className='bg-warning text-white p-3 fw-bold mt-3' onClick={() => navigate("/")}><i class="fa-solid fa-arrow-left fa-2xl"></i></button>
        <div className="card mt-0 bg-dark text-white">
          <div className='row g-0 d-flex justify-content-center'>
            <div className="col-lg-4 mb-5 mt-5">
              <img src={movie.image} alt={movie.name} className="w-100 my-3" />
            </div>
            <div className="col-lg-8 mt-5 px-5">
              <div className="card-body">
                <h2 className="card-title">Movie Name: {movie.name}</h2>
                <div className="card-text" style={{ fontSize: "25px" }}>
                  <p><b>Release Data:  </b>{movie.releasedate}</p>
                  <p><b>Director: </b>{movie.director}</p>
                  <p><b>Budget: </b>{movie.budget}</p>
                  <p><b>Description: </b>{movie.description}</p>
                  <p className='text-warning'>Ticket Price: ₹{movie.ticketprice}</p>
                </div>
              </div>
              <div className="card-footer d-flex flex-column flex-md-row justify-content-center mb-4" style={{ fontSize: "25px" }}>
                <button className='w-100 w-md-50 bg-warning text-white p-2 fw-bold me-md-3 mb-3 mb-md-0' onClick={()=> {addToCart(movie)}}>ADD TO CART</button>
                <button className='w-100 w-md-50 bg-warning text-white p-2 fw-bold ms-md-3 mb-3 mb-md-0'>BUY NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;