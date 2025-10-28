import { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [roomTypes, setRoomTypes] = useState([])
	const [showNewTypeInput, setShowNewTypeInput] = useState(false)
	const [newType, setNewType] = useState("")

	useEffect(() => {
		getRoomTypes().then(setRoomTypes).catch(console.error)
	}, [])

	const handleAddNewType = () => {
		if (newType.trim() !== "") {
			setRoomTypes([...roomTypes, newType.trim()])
			setNewType("")
			setShowNewTypeInput(false)
		}
	}

	return (
		<>
			<select
				required
				className="form-select"
				name="roomType"
				value={newRoom.roomType}
				onChange={(e) => {
					if (e.target.value === "add_new") {
						setShowNewTypeInput(true)
					} else {
						handleRoomInputChange(e)
					}
				}}
			>
				<option value="">Choose room type</option>
				<option value="add_new">+ Add new type</option>
				{roomTypes.map((type, i) => (
					<option key={i} value={type}>
						{type}
					</option>
				))}
			</select>

			{showNewTypeInput && (
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						placeholder="Enter new room type"
						value={newType}
						onChange={(e) => setNewType(e.target.value)}
					/>
					<button className="btn btn-hotel" onClick={handleAddNewType}>
						Add
					</button>
				</div>
			)}
		</>
	)
}

export default RoomTypeSelector
