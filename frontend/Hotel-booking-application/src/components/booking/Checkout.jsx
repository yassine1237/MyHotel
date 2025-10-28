import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import BookingForm from "./BookingForm";
import RoomCarousel from "../common/RoomCarousel";
import {
  FaWifi,
  FaTv,
  FaUtensils,
  FaWineGlassAlt,
  FaCar,
  FaParking,
  FaTshirt,
} from "react-icons/fa";

const Checkout = () => {
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRoomById(roomId)
      .then((data) => setRoomInfo(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [roomId]);

  if (loading) return <div className="mt-4 text-center">Loading room info...</div>;
  if (error) return <div className="mt-4 text-danger text-center">Error loading room.</div>;
  if (!roomInfo) return <div className="mt-4 text-center">No room data found.</div>;

  const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Room details card */}
        <div className="col-md-4 mb-5">
          <div className="room-info card shadow-sm">
            <img
              src={
                roomInfo.photo
                  ? `data:image/jpeg;base64,${roomInfo.photo}`
                  : fallbackImage
              }
              alt="Room"
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <table className="table mt-3">
              <tbody>
                <tr>
                  <th>Room Type:</th>
                  <td>{roomInfo.roomType || "N/A"}</td>
                </tr>
                <tr>
                  <th>Price / Night:</th>
                  <td>
                    {roomInfo.price != null
                      ? `${roomInfo.price.toFixed(2)} €`
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th>Includes:</th>
                  <td>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <FaWifi /> Wi-Fi
                      </li>
                      <li>
                        <FaTv /> Netflix Premium
                      </li>
                      <li>
                        <FaUtensils /> Breakfast
                      </li>
                      <li>
                        <FaWineGlassAlt /> Mini Bar
                      </li>
                      <li>
                        <FaCar /> Car Service
                      </li>
                      <li>
                        <FaParking /> Parking
                      </li>
                      <li>
                        <FaTshirt /> Laundry
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking form */}
        <div className="col-md-8">
          <BookingForm />
        </div>
      </div>

      {/* Other rooms carousel */}
      <RoomCarousel />
    </div>
  );
};

export default Checkout;
