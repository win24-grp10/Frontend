import "./Nav.css";
import corelogo from "../Images/Corelogo.png";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector(".user-menu-nav");
      if (menu && !menu.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const checkAuth = React.useCallback(async () => {
    try {
      const res = await fetch(
        "https://grp10authserviceapp.azurewebsites.net/api/Account/me",
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setUserEmail(data.email);
      } else {
        setUserEmail(null);
      }
    } catch {
      setUserEmail(null);
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await fetch(
        "https://grp10authserviceapp.azurewebsites.net/api/Account/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } finally {
      await checkAuth();
      setOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <img className="logo" src={corelogo} alt="Logo" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#">
            About <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <Link to="/team">Gym Team</Link>
            </li>
            <li>
              <Link to="/team">MemberShip</Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Classes <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Yoga</a>
            </li>
            <li>
              <a href="#">Zumba</a>
            </li>
            <li>
              <a href="#">Spinning</a>
            </li>
            <li>
              <a href="#">Core</a>
            </li>
            <li>
              <a href="#">Les Mills Virtual</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Schedule <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Weekly</a>
            </li>
            <li>
              <a href="#">Monthly</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Trainers <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Personal-Trainer</a>
            </li>
            <li>
              <a href="#">Group-Instructors</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Blog <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Tips</a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>

      <div className="user-menu user-menu-nav">
        <button
          className="user-menu-trigger"
          onClick={() => setOpen((o) => !o)}
        >
          <i className="fa-solid fa-user" style={{ color: "black" }} />
        </button>

        <div className={`logout-box ${open ? "show" : ""}`} role="menu">
          {userEmail ? (
            <>
              <div className="user-info-text">{userEmail}</div>
              <button onClick={logout} className="logout-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="logout-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
