import "./Card.css";
import type { Workout } from "../components/WorkoutList/WorkoutList";

interface CardProps {
  dataObj: Workout;
}

const Card: React.FC<CardProps> = ({ dataObj }) => {
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
          <div className="day">{dataObj.date}</div>
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
            <i className="fa-solid fa-users"></i> Platser:<br></br>{" "}
            {dataObj.capacity}
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Plats:<br></br>{" "}
            {dataObj.location}
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i>Info:<br></br>{" "}
            {dataObj.details}
          </p>
        </div>
      </div>

      {/* Innehåll */}
      <div className="content-section">
        <h2 className="title">{dataObj.title}</h2>
        <div className="participants">
          <i className="fa-solid fa-user"></i>
          <span className="participants-text">{dataObj.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
