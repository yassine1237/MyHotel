import { useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		if (!selectedType) {
			setFilteredData(data)
		} else {
			const filteredRooms = data.filter((room) =>
				room.roomType?.toLowerCase().includes(selectedType.toLowerCase())
			)
			setFilteredData(filteredRooms)
		}
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	// Get unique room types safely
	const roomTypes = [...new Set(data.map((room) => room.roomType).filter(Boolean))]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text fw-semibold" id="room-type-filter">
				Filter by type
			</span>
			<select
				className="form-select"
				aria-label="Room type filter"
				value={filter}
				onChange={handleSelectChange}
			>
				<option value="">All room types</option>
				{roomTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>
				Clear
			</button>
		</div>
	)
}

export default RoomFilter
