import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* register page */}
      <Route path="/register" element={<RegisterPage />} />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
