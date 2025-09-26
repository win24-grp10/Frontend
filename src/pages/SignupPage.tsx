import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthBg from "../Images/auth-background.jpg";
import "../styles/auth.css";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, checked } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const register = async (data: FormData) => {
    const res = await fetch(
      "https://grp10authserviceapp.azurewebsites.net/api/Account/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          acceptTerms: data.acceptTerms,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Registration failed");
    }

    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(formData);
      setSuccess("✅ Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  return (
    <main className="auth-page">
      <img className="auth-bg-image" src={AuthBg} alt="Background" />

      <div className="container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              name="acceptTerms"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I accept <a href="#">Terms and Conditions</a>
            </label>
          </div>

          <button type="submit" className="btn btn-login-register">
            Create Account
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <p className="login-link">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
