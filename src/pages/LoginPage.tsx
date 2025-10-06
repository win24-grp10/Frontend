import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthBg from "../Images/auth-background.jpg";
import "../styles/auth.css";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔑 Login request
  const login = async (data: LoginData) => {
    const res = await fetch(
      "https://grp10authserviceapp.azurewebsites.net/api/Account/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // skickar cookies
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Login failed");
    }

    return res.json();
  };

  // 👤 Hämta inloggad användare
  const fetchUser = async () => {
    const res = await fetch(
      "https://grp10authserviceapp.azurewebsites.net/api/Account/me",
      {
        method: "GET",
        credentials: "include", // skickar cookies
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user info");
    }

    return res.json();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(formData); 

      const user = await fetchUser();
      console.log("👤 Current user:", user);

      if (user && user.id) {
        localStorage.setItem("userId", user.id);
      }

      console.log(localStorage.getItem("userId"));

      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/landing"), 1000);
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

      <div className="container-form">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="reg-form-input-box">
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
          </div>

          <button type="submit" className="btn btn-login-register">
            Login
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <p className="login-link">
            Don’t have an account? <Link to="/signup">Register</Link>
          </p>

          <p className="back-home-link">
            <Link to="/">⬅ Back to Home</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
