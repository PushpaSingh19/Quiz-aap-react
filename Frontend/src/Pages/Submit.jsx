import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { UserContext } from "../App";
import Btn from "../components/Button/Btn";
import { Link } from "react-router-dom";

function Submit() {
  const { selectedOption, questions } = useContext(UserContext);

  return (
    <>
      {/* <Navbar title="Logout" url="/" /> */}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <Container className="shadow">
        <h2 className="text-center">Your Selected Options </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Selected Option</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question.question}</td>
                <td>{question.correct_option}</td>
                <td>
                  {selectedOption[index] != null ? (
                    selectedOption[index]
                  ) : (
                    <span className="text-danger">Not Answered</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/score">
          <Btn type="button" title="View Score" />
        </Link>{" "}
        <br /> <br />
      </Container>
    </>
  );
}

export default Submit;
