import { useEffect } from "react";
import "./ConfirmationMessage.css";

type ConfirmationMessageProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

const ConfirmationMessage = ({ message, type = "success", onClose }: ConfirmationMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);
  return (
    <div className={`confirmation-container ${type}`} onClick={onClose}>
      {message}
    </div>
  );
};

export default ConfirmationMessage;
