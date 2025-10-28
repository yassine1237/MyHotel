import { Container } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <Container>
        <p className="mb-0">
          &copy; {year} <span className="hotel-color">Yassin Palace Hotel</span> | Crafted with care for your comfort
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
