import "./Card.css";
import type { Workout } from "../components/WorkoutList/WorkoutList";

interface CardProps {
  dataObj: Workout;
}

const Card: React.FC<CardProps> = ({ dataObj }) => {

  let dateStr = "";
  let timeStr = "";
  if (dataObj.date) {
    const dateObj = new Date(dataObj.date);
    dateStr = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    timeStr = dateObj.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
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
           {dateStr}<span>{timeStr && ` ${timeStr}`}</span>
          </div>
          <div className="book-btn day">
            <a href="#"></a>
            BOOK HERE 
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
          <p><i className="fa-solid fa-circle-info"></i>
           Info:<br></br>{" "}
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
