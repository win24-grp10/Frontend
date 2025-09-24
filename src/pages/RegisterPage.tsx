import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/auth.css";
import AuthBg from "../Images/auth-background.jpg";


const RegisterPage = () => {
  return (
    <>
    <main>
      <img className="auth-bg-image" src={AuthBg} alt="Background" />
      
      <div className="container">
        <h2>Register</h2>

        <form>
          <div className="reg-form-input-box">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Your full name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email address" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I accept <a href="#">Terms and Conditions</a>
            </label>
          </div>

          <button type="submit" className="btn btn-login-register">
            Create Account
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>  
   
    </>
  )
}

export default RegisterPage