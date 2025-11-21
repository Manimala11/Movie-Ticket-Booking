import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
  const [user, setUser] =  useState(localStorage.getItem("google_credential") || null);


  const handleLoginSuccess = (credentialResponse) => {
    localStorage.setItem("google_credential", credentialResponse.credential);
    window.dispatchEvent(new Event("storage"));
    console.log("Google credential:", credentialResponse.credential);
    
    setUser(credentialResponse.credential);
    toast.success("Google Login Successful!");
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
     toast.error("Google Login Failed!");
  };
 const handleManualLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "user@example.com" && password === "123456") {
      localStorage.setItem("google_credential", username);
      setUser(username);
      window.dispatchEvent(new Event("storage")); 
      toast.success("Login Successful!");
    } else {
      toast.error("Invalid username or password!");
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="d-flex justify-content-center align-items-center bg-dark">
      <ToastContainer/>
      <div className="card bg-dark text-light shadow-lg  p-4 my-4 border border-warning rounded-4" style={{width: '400px'}}>
          <div>
          <h3 className="text-center mb-4 ">🎬 Log in</h3>
          <div className="d-flex justify-content-center mb-3">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          </div>
            <div className="text-center text-warning mb-3">or</div>
            <form onSubmit={handleManualLogin}>
              <div className="mb-3">
                <label className="form-label text-warning">Username or Email</label>
                <input type="text" name= "username"className="form-control border-warning" placeholder="Enter username or email" />
              </div>

              <div className="mb-3">
                <label className="form-label text-warning">Password</label>
                <input type="password" name="password" className="form-control border-warning" placeholder="Enter password" />
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
          </div>
      </div>
    </div>
  )

}

export default LoginPage;
