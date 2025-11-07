import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    localStorage.setItem("google_credential", credentialResponse.credential);
    window.dispatchEvent(new Event("storage"));
    console.log("Google credential:", credentialResponse.credential);
    
    setUser(credentialResponse.credential);
    localStorage.setItem("google_credential", credentialResponse.credential)
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
  };

  const handleLogout = ()=> {
    googleLogout();
    localStorage.removeItem("google_credential");
    setUser(null);
    console.log("Logged Out")
  }
  return (
    <div className="d-flex justify-content-center align-item-center bg-dark">
      <div className="card bg-dark text-light shadow-lg  p-4 my-4 border border-warning rounded-4" style={{width: '400px'}}>
        {!user ? (
          <h3 className="text-center mb-4 ">🎬 Log in</h3>
        ) : (
          <h3 className="text-center mb-4 ">🎬 Log Out</h3>
        )}
        
 
        {!user ? (
          <div className="d-flex justify-content-center mb-3">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          </div>
        ) : (
            <button onClick={handleLogout} className="btn btn-danger w-100 fw-bold">
            🚪 Logout
            </button>   
        )}

        {!user && (
          <>
            <div className="text-center text-warning mb-3">or</div>
            <form>
              <div className="mb-3">
                <label className="form-label text-warning">Username or Email</label>
                <input type="text" className="form-control border-warning" placeholder="Enter username or email" />
              </div>

              <div className="mb-3">
                <label className="form-label text-warning">Password</label>
                <input type="password" className="form-control border-warning" placeholder="Enter password" />
              </div>

              <div className="d-flex justify-content-between mb-3">
                <div>
                  <input type="checkbox" className="form-check-input me-2 border-warning" />
                  Remember Me
                </div>
                <a href="#" className="text-decoration-none text-warning">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-warning w-100 text-white fw-bold">
                Sign In
              </button>

            </form>
          </>
        )}

         {user && (
          <div className="alert alert-success mt-3" role="alert">
            ✅ Logged in!
          </div>
        )}

         <p className="text-center mt-3">
          New user? <a href="#" className="text-decoration-none text-warning">Register Now</a>
        </p>

      </div>
    </div>
  )

}

export default LoginPage;
