import { useLocation, Link } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error

	return (
		<div className="container text-center mt-5">
			<Header title="Reservation Status" />
			<div className="mt-5">
				{message ? (
					<>
						<h3 className="text-success mb-3">Your booking is confirmed!</h3>
						<p>Confirmation Code: <strong>{message}</strong></p>
					</>
				) : (
					<>
						<h3 className="text-danger mb-3">Booking Failed</h3>
						<p>{error}</p>
					</>
				)}
				<Link to="/" className="btn btn-hotel mt-4">Back to Home</Link>
			</div>
		</div>
	)
}

export default BookingSuccess
