import "./Card.css"; // din css

const HoverCard = () => {
  return (
    <div className="card">
      <div className="image-section">
        <img
          src="https://images.unsplash.com/photo-1609377375724-400f1be10fb8?ixlib=rb-4.0.3&q=80&w=1080"
          alt="Gym"
          className="card-image"
        />

        {/* Overlay schema (vänster) */}
        <div className="schedule">
          <div className="day">
            THU <span>13:30</span>
          </div>
          <div className="day">
            FRI <span>17:00</span>
          </div>
          <div className="day">
            SAT <span>08:30</span>
          </div>
        </div>

        {/* Overlay info (höger) */}
        <div className="info-box">
          <p>
            <i className="fa-solid fa-users"></i> Platser: 25
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Göteborg
          </p>
        </div>
      </div>

      {/* Innehåll */}
      <div className="content-section">
        <h2 className="title">Yoga</h2>
        <div className="participants">
          <i className="fa-solid fa-user"></i>
          <span className="participants-text">
            Zerdan Geyik, Emil, Ulf Gudmundsson
          </span>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
