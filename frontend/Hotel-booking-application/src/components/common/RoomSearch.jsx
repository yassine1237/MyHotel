import { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		checkInDate: "",
		checkOutDate: "",
		roomType: ""
	})
	const [errorMessage, setErrorMessage] = useState("")
	const [availableRooms, setAvailableRooms] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = async (e) => {
		e.preventDefault()

		const { checkInDate, checkOutDate, roomType } = searchQuery
		const checkIn = moment(checkInDate)
		const checkOut = moment(checkOutDate)

		if (!checkIn.isValid() || !checkOut.isValid()) {
			setErrorMessage("Please enter valid dates.")
			return
		}
		if (checkOut.isSameOrBefore(checkIn)) {
			setErrorMessage("Check-out must be after check-in.")
			return
		}

		setIsLoading(true)
		try {
			const response = await getAvailableRooms(checkInDate, checkOutDate, roomType)
			setAvailableRooms(response.data)
		} catch (error) {
			setErrorMessage("Error fetching available rooms.")
		} finally {
			setIsLoading(false)
		}
	}

	const handleInputChange = (e) => {
		setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
		setErrorMessage("")
	}

	const handleClearSearch = () => {
		setSearchQuery({ checkInDate: "", checkOutDate: "", roomType: "" })
		setAvailableRooms([])
	}

	return (
		<Container className="shadow mt-5 mb-5 py-5 rounded">
			<Form onSubmit={handleSearch}>
				<Row className="justify-content-center">
					<Col xs={12} md={3}>
						<Form.Group controlId="checkInDate">
							<Form.Label>Check-In</Form.Label>
							<Form.Control
								type="date"
								name="checkInDate"
								value={searchQuery.checkInDate}
								onChange={handleInputChange}
								min={moment().format("YYYY-MM-DD")}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="checkOutDate">
							<Form.Label>Check-Out</Form.Label>
							<Form.Control
								type="date"
								name="checkOutDate"
								value={searchQuery.checkOutDate}
								onChange={handleInputChange}
								min={moment().format("YYYY-MM-DD")}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="roomType">
							<Form.Label>Room Type</Form.Label>
							<div className="d-flex">
								<RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={searchQuery} />
								<Button variant="hotel" type="submit" className="ms-2">
									Search
								</Button>
							</div>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			{errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

			{isLoading ? (
				<p className="mt-4 text-center">Searching for available rooms...</p>
			) : (
				availableRooms.length > 0 && (
					<RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
				)
			)}
		</Container>
	)
}

export default RoomSearch
