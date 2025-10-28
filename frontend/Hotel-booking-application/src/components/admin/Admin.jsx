import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2 className="hotel-color">Admin Dashboard</h2>
			<hr />
			<div className="d-flex flex-column gap-2">
				<Link to="/existing-rooms" className="btn btn-outline-primary w-50">
					Manage Rooms
				</Link>
				<Link to="/existing-bookings" className="btn btn-outline-secondary w-50">
					Manage Bookings
				</Link>
			</div>
		</section>
	)
}

export default Admin
