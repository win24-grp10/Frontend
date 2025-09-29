import "./WorkoutList.css";
import Card from "../Card";
import "../WorkoutList/WorkoutList.css";

const WorkoutList = () => {
  return (
    <>
      <div className="container-workoutlist">
        <div className="workout-list">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default WorkoutList;
