import { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail"); // ✅ correct key
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userEmail, token); // ✅ pass email
        setUser(userData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load user info");
      }
    };
    fetchUser();
  }, [userEmail]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userEmail, token); // ✅ pass email
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, [userEmail]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const response = await deleteUser(userEmail); // ✅ pass email
        setMessage(response);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRoles");
        navigate("/");
        window.location.reload();
      } catch (error) {
        setErrorMessage("Failed to delete account");
      }
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-success">{message}</p>}
      {user ? (
        <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <img
                        src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <p><b>ID:</b> {user.id}</p>
                      <p><b>First Name:</b> {user.firstName}</p>
                      <p><b>Last Name:</b> {user.lastName}</p>
                      <p><b>Email:</b> {user.email}</p>
                      <p><b>Roles:</b> {user.roles.map(role => role.name).join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="card-title text-center">Booking History</h4>

              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Room ID</th>
                      <th>Room Type</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Confirmation Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                        <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>You have not made any bookings yet.</p>
              )}

              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                  Close account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
