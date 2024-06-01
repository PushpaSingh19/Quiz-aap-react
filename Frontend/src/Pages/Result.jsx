import { Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../App";
import Heading from "../components/Heading/Heading";
import Navbar from "..//components/Header/Navbar";

function Result() {
  const { selectedOption, questions } = useContext(UserContext);

  const score = questions.reduce((acc, question, index) => {
    if (selectedOption[index] === question.correct_option) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <>
      <Navbar title="Logout" url="/" />
      <br /> <br /> <br /> <br /> <br /> <br />
      <Container
        className="border mt-3 w-50 text-center"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 20px 15px rgba(0,0,0,0.5)",
        }}
      >
        <Heading title="Score Board :" />
        <br />
        {score === questions.length ? (
          <h3 style={{ fontSize: "40px" }}>
            Hurray! Well done! <span style={{ fontSize: "60px" }}>😀😀</span>
          </h3>
        ) : score === 0 ? (
          <h3 style={{ fontSize: "40px" }}>
            Better luck next time.<span style={{ fontSize: "60px" }}>😔😔</span>
          </h3>
        ) : score < questions.length ? (
          <h3 style={{ fontSize: "40px" }}>
            Nice try! <span style={{ fontSize: "60px" }}>🙂</span>
          </h3>
        ) : null}
        <br />
        <h3>
          Your Score is: {score}/{questions.length}
        </h3>
      </Container>
    </>
  );
}

export default Result;
