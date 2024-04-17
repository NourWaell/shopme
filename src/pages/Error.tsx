import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "15%" }}
      >
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          How about going back to home?
        </Link>
      </div>
    </Container>
  );
};
export default Error;
