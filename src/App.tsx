import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage.js";
import LandingPage from "./pages/LandingPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* signup page */}
      <Route path="/signup" element={<SignupPage />} />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
