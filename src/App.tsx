import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import LandingPage from "./pages/LandingPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import { Team } from "./pages/Team.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Team page */}
        <Route path="/team" element={<Team />} />
      </Route>

      {/* signup page */}
      <Route path="/signup" element={<SignupPage />} />

      {/* login page */}
      <Route path="/login" element={<LoginPage />} />

       <Route path="/profile" element={<ProfilePage />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
