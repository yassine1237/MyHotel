import { useEffect, useState } from "react"
import { parseISO } from "date-fns"
import DateSlider from "../common/DateSlider"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState([])

	useEffect(() => setFilteredBookings(bookingInfo), [bookingInfo])

	const filterByDate = (start, end) => {
		if (!start || !end) return setFilteredBookings(bookingInfo)
		const filtered = bookingInfo.filter((b) => {
			const checkIn = parseISO(b.checkInDate)
			const checkOut = parseISO(b.checkOutDate)
			return checkIn >= start && checkOut <= end
		})
		setFilteredBookings(filtered)
	}

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterByDate} onFilterChange={filterByDate} />
			<table className="table table-bordered table-hover shadow text-center">
				<thead className="table-light">
					<tr>
						<th>#</th>
						<th>Booking ID</th>
						<th>Room Type</th>
						<th>Check-In</th>
						<th>Check-Out</th>
						<th>Guest</th>
						<th>Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guests</th>
						<th>Code</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{filteredBookings.length > 0 ? (
						filteredBookings.map((b, i) => (
							<tr key={b.id}>
								<td>{i + 1}</td>
								<td>{b.id}</td>
								<td>{b.room.roomType}</td>
								<td>{b.checkInDate}</td>
								<td>{b.checkOutDate}</td>
								<td>{b.guestName}</td>
								<td>{b.guestEmail}</td>
								<td>{b.numOfAdults}</td>
								<td>{b.numOfChildren}</td>
								<td>{b.totalNumOfGuests}</td>
								<td>{b.bookingConfirmationCode}</td>
								<td>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleBookingCancellation(b.id)}>
										Cancel
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="12">No bookings found for the selected range.</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	)
}

export default BookingsTable
