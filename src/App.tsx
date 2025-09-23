import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {

  return (
    <Routes>
      {/* default /register for now */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* register page */}
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  )
}
export default App;
