import { useEffect, useState } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"

const Bookings = () => {
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const data = await getAllBookings()
				setBookings(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchBookings()
	}, [])

	const handleCancel = async (bookingId) => {
		try {
			await cancelBooking(bookingId)
			const updated = await getAllBookings()
			setBookings(updated)
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<section style={{ backgroundColor: "whitesmoke" }}>
			<Header title="Manage Reservations" />
			{error && <p className="text-danger text-center mt-3">{error}</p>}
			{isLoading ? (
				<p className="text-center mt-4">Loading bookings...</p>
			) : (
				<BookingsTable bookingInfo={bookings} handleBookingCancellation={handleCancel} />
			)}
		</section>
	)
}

export default Bookings
