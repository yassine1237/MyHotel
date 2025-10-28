import React, { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([])
	const [filteredRooms, setFilteredRooms] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [roomsPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() => {
		const fetchRooms = async () => {
			setIsLoading(true)
			try {
				const result = await getAllRooms()
				setRooms(result)
				setFilteredRooms(result)
			} catch (error) {
				setErrorMessage("Failed to fetch rooms.")
			}
			setIsLoading(false)
		}
		fetchRooms()
	}, [])

	const handleDelete = async (roomId) => {
		try {
			await deleteRoom(roomId)
			setSuccessMessage(`✅ Room #${roomId} deleted successfully!`)
			setRooms(rooms.filter((room) => room.id !== roomId))
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	const indexOfLastRoom = currentPage * roomsPerPage
	const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
	const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

	return (
		<section className="container mt-5 mb-5">
			{successMessage && <p className="alert alert-success">{successMessage}</p>}
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

			<div className="d-flex justify-content-between mb-3">
				<h2>Existing Rooms</h2>
				<Link to="/add-room" className="btn btn-success">
					<FaPlus /> Add Room
				</Link>
			</div>

			<Row className="mb-3">
				<Col md={6}><RoomFilter data={rooms} setFilteredData={setFilteredRooms} /></Col>
			</Row>

			{isLoading ? (
				<p>Loading rooms...</p>
			) : (
				<table className="table table-bordered text-center">
					<thead className="table-light">
						<tr>
							<th>ID</th>
							<th>Type</th>
							<th>Price (€)</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentRooms.map((room) => (
							<tr key={room.id}>
								<td>{room.id}</td>
								<td>{room.roomType}</td>
								<td>{room.roomPrice}</td>
								<td>
									<Link to={`/edit-room/${room.id}`} className="btn btn-warning btn-sm mx-1"><FaEdit /></Link>
									<button onClick={() => handleDelete(room.id)} className="btn btn-danger btn-sm mx-1"><FaTrashAlt /></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<RoomPaginator
				currentPage={currentPage}
				totalPages={Math.ceil(filteredRooms.length / roomsPerPage)}
				onPageChange={setCurrentPage}
			/>
		</section>
	)
}

export default ExistingRooms
