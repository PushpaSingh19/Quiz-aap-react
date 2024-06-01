import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Btn from "../components/Button/Btn";
import { UserContext } from "../App";

function PopUp() {
  const { username } = useContext(UserContext);

  return (
    <>
      <Container
        className="w-50 shadow-lg mt-5 "
        style={{ borderRadius: "1rem" }}
      >
        {" "}
        <br />
        <br />
        <h2 className="text-center">{username}</h2>
        <h3 className="text-success">
          your account has been created successfully.
        </h3>
        <br />
        <div className="d-flex justify-content-center">
          <Link to="/login">
            <Btn type="button" title="Ok" />
          </Link>
        </div>
        <br /> <br />
      </Container>
    </>
  );
}

export default PopUp;
