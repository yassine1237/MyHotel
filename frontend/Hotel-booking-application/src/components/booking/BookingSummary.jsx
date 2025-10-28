import { useState } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"

const BookingSummary = ({ booking, payment, onConfirm }) => {
	const checkIn = moment(booking.checkInDate)
	const checkOut = moment(booking.checkOutDate)
	const totalDays = checkOut.diff(checkIn, "days")
	const [isProcessing, setIsProcessing] = useState(false)

	const confirmBooking = () => {
		setIsProcessing(true)
		setTimeout(() => {
			setIsProcessing(false)
			onConfirm()
		}, 2000)
	}

	return (
		<div className="card card-body mt-5 shadow-sm">
			<h4 className="card-title hotel-color mb-3">Booking Overview</h4>

			<p>Name: <strong>{booking.guestFullName}</strong></p>
			<p>Email: <strong>{booking.guestEmail}</strong></p>
			<p>Check-In: <strong>{checkIn.format("MMM Do YYYY")}</strong></p>
			<p>Check-Out: <strong>{checkOut.format("MMM Do YYYY")}</strong></p>
			<p>Days: <strong>{totalDays}</strong></p>

			<div className="mt-3">
				<h6 className="hotel-color">Guests</h6>
				<p>Adults: {booking.numOfAdults}</p>
				<p>Children: {booking.numOfChildren}</p>
			</div>

			{payment > 0 ? (
				<div className="mt-3">
					<h6>Total: <strong>${payment}</strong></h6>
					<Button
						variant="success"
						className="w-100 mt-2"
						disabled={isProcessing}
						onClick={confirmBooking}>
						{isProcessing ? "Processing..." : "Confirm Reservation"}
					</Button>
				</div>
			) : (
				<p className="text-danger mt-2">Invalid booking dates.</p>
			)}
		</div>
	)
}

export default BookingSummary
