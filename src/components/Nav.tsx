import "./Nav.css"; // din css

const Navigation = () => {
  return (
    <nav className="navbar">
      <img
        className="logo"
        src="../src/images/Coregym.png"
        alt="Logo"
      />
      <ul className="nav-links">
        <li>
          <a href="#">
            Home <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Overview</a></li>
            <li><a href="#">Highlights</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            About <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Team</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Pages <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Elements <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Buttons</a></li>
            <li><a href="#">Cards</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Classes <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Yoga</a></li>
            <li><a href="#">Strength</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Schedule <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Weekly</a></li>
            <li><a href="#">Monthly</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Trainers <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">Personal</a></li>
            <li><a href="#">Group</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            Blog <i className="fa-solid fa-chevron-down"></i>
          </a>
          <ul className="dropdown">
            <li><a href="#">News</a></li>
            <li><a href="#">Tips</a></li>
          </ul>
        </li>
      </ul>

      <li>
        <a href="#">
          <i className="fa-solid fa-user"></i>
        </a>
      </li>

      <div id="dropdown" className="dropdown">
        <a href="#">Log out</a>
      </div>
    </nav>
  );
};

export default Navigation;
