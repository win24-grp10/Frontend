import "../components/BookButton.css";

interface ButtonProps {
  workoutId: string;
  userId: string;
  onRefresh?: () => void;
  onConfirmation: (message: string, type: "success" | "error") => void;
}

const BookButton: React.FC<ButtonProps> = ({ workoutId, userId, onRefresh, onConfirmation }) => {
  const handleBooking = async () => {
    try {
      const res = await fetch("https://grp10bookingapp.azurewebsites.net/api/Booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workoutId,
          userId,
          quantity: 1,
        }),
      });

      if (res.ok) {
        //Add Confimation//
        onRefresh && onRefresh();

        onConfirmation("Bokning genomförd!", "success");
      } else {
        const error = await res.text();
        onConfirmation(`Bokning misslyckades: ${error}`, "error");
      }
    } catch (error) {
      console.error("Error booking workout:", error);
      onConfirmation("Nätverksfel, försök senare.", "error");
    }
  };
  return (
    <button className="book-btn" onClick={handleBooking}>
      Book Here
    </button>
  );
};

export default BookButton;
