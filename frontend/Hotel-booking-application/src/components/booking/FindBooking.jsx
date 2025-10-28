import { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [booking, setBooking] = useState(null)
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [deleted, setDeleted] = useState(false)

	const handleInputChange = (e) => {
		setConfirmationCode(e.target.value)
		setError("")
		setMessage("")
	}

	const handleSearch = async (e) => {
		e.preventDefault()
		if (!confirmationCode.trim()) {
			setError("Please enter a valid confirmation code.")
			return
		}

		setLoading(true)
		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBooking(data)
			setError("")
		} catch (err) {
			setBooking(null)
			setError(
				err.response?.status === 404
					? "No booking found for this confirmation code."
					: "Unable to retrieve booking."
			)
		} finally {
			setLoading(false)
		}
	}

	const handleCancelBooking = async () => {
		if (!booking) return
		try {
			await cancelBooking(booking.id)
			setDeleted(true)
			setMessage("Your booking has been successfully canceled.")
			setBooking(null)
			setConfirmationCode("")
		} catch (err) {
			setError("Failed to cancel booking. Please try again.")
		} finally {
			setTimeout(() => {
				setMessage("")
				setDeleted(false)
			}, 3000)
		}
	}

	return (
		<div className="container mt-5 d-flex flex-column align-items-center">
			<h2 className="text-center mb-4 hotel-color">Find Your Reservation</h2>

			<form onSubmit={handleSearch} className="col-md-6 mb-4">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter your booking confirmation code"
						value={confirmationCode}
						onChange={handleInputChange}
					/>
					<button type="submit" className="btn btn-hotel">
						Search
					</button>
				</div>
			</form>

			{loading && <p>Looking up your booking...</p>}
			{error && <p className="text-danger">{error}</p>}
			{message && <div className="alert alert-success fade show">{message}</div>}

			{booking && (
				<div className="col-md-6 card shadow-sm p-4 mt-3 mb-5">
					<h4 className="hotel-color mb-3 text-center">Booking Details</h4>
					<p>
						<strong>Confirmation Code:</strong> {booking.bookingConfirmationCode}
					</p>
					<p>
						<strong>Room Type:</strong> {booking.room.roomType}
					</p>
					<p>
						<strong>Room Number:</strong> {booking.room.id}
					</p>
					<p>
						<strong>Check-In:</strong>{" "}
						{moment(booking.checkInDate).format("MMM Do, YYYY")}
					</p>
					<p>
						<strong>Check-Out:</strong>{" "}
						{moment(booking.checkOutDate).format("MMM Do, YYYY")}
					</p>
					<p>
						<strong>Guest Name:</strong> {booking.guestName}
					</p>
					<p>
						<strong>Email:</strong> {booking.guestEmail}
					</p>
					<p>
						<strong>Guests:</strong> {booking.numOfAdults} Adults,{" "}
						{booking.numOfChildren} Children
					</p>
					<p>
						<strong>Total Guests:</strong> {booking.totalNumOfGuests}
					</p>

					{!deleted && (
						<button className="btn btn-danger w-100 mt-3" onClick={handleCancelBooking}>
							Cancel Booking
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default FindBooking
