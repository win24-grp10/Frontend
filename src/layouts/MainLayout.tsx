import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Alla komponenter som används på alla sidor kan vara här, t.ex. Footer, Header, Navbar etc.
export default function MainLayout() {
  return (
    <>
      <div className="layout">
        <main className="layout-content">
          <Header/>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
