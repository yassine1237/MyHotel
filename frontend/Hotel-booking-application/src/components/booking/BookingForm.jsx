import { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // ✅ Use the user's email, not ID
  const userEmail = localStorage.getItem("userEmail") || "";

  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // ✅ new state for live total

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: userEmail,
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  // ✅ Fetch room price from backend
  useEffect(() => {
    const fetchRoomPrice = async () => {
      try {
        const response = await getRoomById(roomId);
        setRoomPrice(response.price);
      } catch (error) {
        console.error("Error fetching room price:", error);
      }
    };
    fetchRoomPrice();
  }, [roomId]);

  // ✅ Automatically update total when date or price changes
  useEffect(() => {
    if (booking.checkInDate && booking.checkOutDate && roomPrice > 0) {
      const checkIn = moment(booking.checkInDate);
      const checkOut = moment(booking.checkOutDate);
      const days = checkOut.diff(checkIn, "days");
      setTotalPrice(days > 0 ? days * roomPrice : 0);
    } else {
      setTotalPrice(0);
    }
  }, [booking.checkInDate, booking.checkOutDate, roomPrice]);

  const handleInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const isGuestCountValid = () => {
    const adults = parseInt(booking.numOfAdults);
    const children = parseInt(booking.numOfChildren);
    return adults >= 1 && adults + children >= 1;
  };

  const isDateRangeValid = () => {
    if (!moment(booking.checkOutDate).isAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out must be after check-in.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.currentTarget.checkValidity() === false ||
      !isGuestCountValid() ||
      !isDateRangeValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const confirmBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      navigate("/booking-success", { state: { error: error.message } });
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5 shadow-sm">
            <h4 className="card-title mb-3">Book Your Stay</h4>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="hotel-color">Full Name</Form.Label>
                <FormControl
                  required
                  type="text"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your full name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="hotel-color mt-3">Email</Form.Label>
                <FormControl
                  required
                  type="email"
                  name="guestEmail"
                  value={booking.guestEmail}
                  disabled
                />
              </Form.Group>

              <fieldset className="mt-3">
                <legend className="fs-6 fw-semibold">Stay Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label>Check-In</Form.Label>
                    <FormControl
                      required
                      type="date"
                      name="checkInDate"
                      value={booking.checkInDate}
                      onChange={handleInputChange}
                      min={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                  <div className="col-6">
                    <Form.Label>Check-Out</Form.Label>
                    <FormControl
                      required
                      type="date"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      onChange={handleInputChange}
                      min={moment().format("YYYY-MM-DD")}
                    />
                  </div>
                </div>
                {errorMessage && <p className="text-danger mt-1">{errorMessage}</p>}
              </fieldset>

              <fieldset className="mt-3">
                <legend className="fs-6 fw-semibold">Guests</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label>Adults</Form.Label>
                    <FormControl
                      required
                      type="number"
                      name="numOfAdults"
                      min={1}
                      value={booking.numOfAdults}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <Form.Label>Children</Form.Label>
                    <FormControl
                      type="number"
                      name="numOfChildren"
                      min={0}
                      value={booking.numOfChildren}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* ✅ Live total display */}
              <div className="mt-4 text-end">
                <strong>
                  Total:{" "}
                  <span className="hotel-color">
                    {totalPrice.toFixed(2)} €
                  </span>
                </strong>
              </div>

              <div className="mt-3">
                <button type="submit" className="btn btn-hotel w-100">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={totalPrice} // ✅ live total now passed
              onConfirm={confirmBooking}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
