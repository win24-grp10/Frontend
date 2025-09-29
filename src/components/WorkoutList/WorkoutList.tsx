import "./WorkoutList.css";
import Card from "../Card";
import "../WorkoutList/WorkoutList.css";
import { useState, useEffect } from "react";

export interface Workout {
  id: string;
  title: string;
  date: string;
  location: string;
  instructor: string;
  details: string;
  capacity: string;
}

const WorkoutList: React.FC = () => {
  const [data, setData] = useState<Workout[]>([]);

  const url =
    "https://grp10workoutserviceapp.azurewebsites.net/api/Workout/getall";
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-workoutlist">
        <div className="workout-list">
          {data.map((dataObj) => (
            <Card key={dataObj.id} dataObj={dataObj} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkoutList;
