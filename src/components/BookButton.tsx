import React from "react";
import "../components/BookButton.css";

interface ButtonProps {
  workoutId: string;
  userId: string;
}

const BookButton: React.FC<ButtonProps> = ({ workoutId, userId }) => {
  const handleBooking = async () => {
    try {
      const res = await fetch(
        "https://grp10bookingapp.azurewebsites.net/api/Booking/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workoutId,
            userId,
            quantity: 1,
          }),
        }
      );

      if (res.ok) {
        //Add Confimation//
        console.log("Booking created");
        console.log(res);
      } else {
        const error = await res.text();
        alert(`Something went wrong: ${error}`);
      }
    } catch (error) {
      console.error("Error booking workout:", error);
    }
  };
  return (
    <button className="book-btn" onClick={handleBooking}>
      Book Here
    </button>
  );
};

export default BookButton;
