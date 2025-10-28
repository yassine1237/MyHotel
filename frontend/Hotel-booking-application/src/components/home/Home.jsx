import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const message = location.state?.message;

  // ✅ Read user info
  const firstName = localStorage.getItem("userFirstName");
  const email = localStorage.getItem("userEmail");
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section>
      {message && <p className="text-warning text-center">{message}</p>}

      {isLoggedIn && (
        <p className="text-success text-center fs-5">
          👋 Welcome back, <strong>{firstName || email || "Guest"}</strong>!
        </p>
      )}

      <MainHeader />

      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <HotelService />
      </div>
    </section>
  );
};

export default Home;
