import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthBg from "../Images/auth-background.jpg";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async (data: LoginData) => {
    const res = await fetch("BYTMIG", {  // byt till rätt ställe här
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Login failed");
    }

    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await login(formData);
      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/BYTMIG"), 2000); // byt till rätt ställe här
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
        </form>
      </div>
    </main>
  );
};

export default LoginPage;