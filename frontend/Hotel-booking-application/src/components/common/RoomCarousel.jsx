import { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const RoomCarousel = () => {
	const [rooms, setRooms] = useState([])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getAllRooms()
			.then((data) => {
				setRooms(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) return <div className="mt-5">Loading rooms...</div>
	if (errorMessage) return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>

	const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image"

	return (
		<section className="bg-light mb-5 mt-5 shadow py-4">
			<h3 className="text-center mb-3">
				<Link to="/browse-all-rooms" className="hotel-color text-decoration-none">
					Explore Our Rooms
				</Link>
			</h3>

			<Container>
				<Carousel indicators={false} interval={4000} fade>
					{[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{rooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} xs={12} md={6} lg={3} className="mb-4">
										<Card className="shadow-sm">
											<Link to={`/book-room/${room.id}`}>
												<Card.Img
													variant="top"
													src={room.photo ? `data:image/jpeg;base64,${room.photo}` : fallbackImage}
													alt={room.roomType}
													style={{ height: "200px", objectFit: "cover" }}
												/>
											</Link>
											<Card.Body className="text-center">
												<Card.Title className="hotel-color">{room.roomType}</Card.Title>
												<Card.Text className="text-muted mb-3">
													{room.price} € / night
												</Card.Text>
												<Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
													Book Now
												</Link>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	)
}

export default RoomCarousel
