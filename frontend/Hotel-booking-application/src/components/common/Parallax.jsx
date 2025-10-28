import { Container } from "react-bootstrap";

const Parallax = () => {
  return (
    <div className="parallax mb-5 text-light text-center d-flex align-items-center justify-content-center">
      <Container className="py-5">
        <div className="animated-texts fadeIn">
          <h1 className="fw-bold">
            Experience timeless elegance at{" "}
            <span className="hotel-color">Yassin Palace Hotel</span>
          </h1>
          <h4 className="mt-3">
            Where comfort meets sophistication — your getaway awaits.
          </h4>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
