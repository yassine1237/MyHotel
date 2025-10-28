import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
	const [room, setRoom] = useState({ photo: "", roomType: "", roomPrice: "" })
	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { roomId } = useParams()

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.photo)
			} catch (error) {
				setErrorMessage("Failed to load room data.")
			}
		}
		fetchRoom()
	}, [roomId])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setRoom({ ...room, [name]: value })
	}

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await updateRoom(roomId, room)
			if (response.status === 200) {
				setSuccessMessage("✅ Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.photo)
				setErrorMessage("")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5">Edit Room</h3>
			<div className="col-md-8 col-lg-6 mx-auto">
				{successMessage && <div className="alert alert-success">{successMessage}</div>}
				{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="roomType" className="form-label">Room Type</label>
						<input
							type="text"
							className="form-control"
							id="roomType"
							name="roomType"
							value={room.roomType}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="roomPrice" className="form-label">Room Price</label>
						<input
							type="number"
							className="form-control"
							id="roomPrice"
							name="roomPrice"
							value={room.roomPrice}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="photo" className="form-label">Photo</label>
						<input type="file" className="form-control" onChange={handleImageChange} />
						{imagePreview && (
							<img
								src={`data:image/jpeg;base64,${imagePreview}`}
								alt="Room preview"
								className="mt-3"
								style={{ maxWidth: "400px", maxHeight: "400px" }}
							/>
						)}
					</div>

					<div className="d-flex gap-3">
						<Link to="/existing-rooms" className="btn btn-outline-info">Back</Link>
						<button type="submit" className="btn btn-outline-warning">Save Changes</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditRoom
