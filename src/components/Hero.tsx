import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>
          BUILD <span className="highlight">YOUR</span> BODY{" "}
          <span className="highlight">STRONG</span>
        </h1>
        <h2>Ready to change your physique?</h2>

        <div className="hero-links">
          <p>Join us today</p>
          <p className="hero-auth-links">
            <Link to="/signup" className="">
              Signup
            </Link>{" "}
            or{" "}
            <Link to="/login" className="">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
