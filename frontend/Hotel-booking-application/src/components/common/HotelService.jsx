import { Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <div className="mb-4">
        <Header
          title="Our Signature Amenities"
          subtitle="Everything you need for a perfect stay at Yassin Palace"
        />

        <Row className="mt-4">
          <h4 className="text-center">
            Welcome to <span className="hotel-color">Yassin Palace Hotel</span> — 
            where luxury and peace blend seamlessly <FaClock className="ms-2" />
          </h4>
        </Row>

        <hr />

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {[
            {
              icon: <FaWifi />,
              title: "Free High-Speed Wi-Fi",
              text: "Stay connected effortlessly throughout your stay.",
            },
            {
              icon: <FaUtensils />,
              title: "Deluxe Breakfast",
              text: "Enjoy a rich buffet of international and local flavors.",
            },
            {
              icon: <FaTshirt />,
              title: "Laundry Service",
              text: "Clean and fresh clothing, ready when you need it.",
            },
            {
              icon: <FaCocktail />,
              title: "Mini-Bar & Lounge",
              text: "Unwind with premium drinks and curated snacks.",
            },
            {
              icon: <FaParking />,
              title: "Private Parking",
              text: "Spacious and secure parking for all our guests.",
            },
            {
              icon: <FaSnowflake />,
              title: "Air-Conditioned Comfort",
              text: "Relax in cool rooms, no matter the season.",
            },
          ].map((service, index) => (
            <Col key={index}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="hotel-color d-flex align-items-center gap-2">
                    {service.icon} {service.title}
                  </Card.Title>
                  <Card.Text>{service.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <hr />
    </>
  );
};

export default HotelService;
