import "./Nav.css";
import corelogo from "../Images/Corelogo.png";
import { useState } from "react";
import React from "react";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const menu = document.querySelector(".user-menu-nav");
    if (menu && !menu.contains(e.target as Node)) setOpen(false);
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  return (
    <nav className="navbar">
      <img className="logo" src={corelogo} alt="Logo" />
      <ul className="nav-links">
        <li>
          <a href="#">
            Home <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">Highlights</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            About <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Our Story</a>
            </li>
            <li>
              <a href="#">Team</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Pages <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Elements <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li>
              <a href="#">Buttons</a>
            </li>
            <li>
              <a href="#">Cards</a>
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
              <a href="#">Strength</a>
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
              <a href="#">Personal</a>
            </li>
            <li>
              <a href="#">Group</a>
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
      </ul>

      <div className="user-menu user-menu-nav">
        <button className="user-menu-trigger" onClick={() => setOpen(o => !o)}>
          <i className="fa-solid fa-user" style={{ color: "black" }} />
        </button>

        <div className={`logout-box ${open ? "show" : ""}`} role="menu">
          <a href="#" role="menuitem">Log out</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
