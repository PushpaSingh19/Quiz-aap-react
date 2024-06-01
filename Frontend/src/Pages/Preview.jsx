import React, { useContext } from "react";
import { Table, Container } from "react-bootstrap";
import { UserContext } from "../App";
import Btn from "../components/Button/Btn";
import { Link, useNavigate } from "react-router-dom";

function Preview() {
  const { questions, selectedOption } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubjectName = (subjectId) => {
    switch (subjectId) {
      case 100:
        return "HTML";
      case 200:
        return "CSS";
      case 300:
        return "Python";
      default:
        return "JavaScript";
    }
  };

  const handleEdit = (index) => {
    const subjectName = handleSubjectName(questions[index].subject_id);
    console.log(subjectName, index, questions[index].subject_id);
    navigate(`/${subjectName}/${questions[index].subject_id}/${index}`);
  };

  return (
    <>
      {" "}
      <br /> <br />
      <Container
        style={{
          borderRadius: "1rem",
          boxShadow: "0 20px 15px rgba(0,0,0,0.5)",
        }}
      >
        {" "}
        <br />
        <h2 className="text-center">Preview</h2>
        <Table striped bordered hover className="shadow mt-5">
          <thead>
            <tr>
              <th>Question</th>
              <th>Selected Option</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question.question}</td>
                <td>
                  {selectedOption[index] != null ? (
                    selectedOption[index]
                  ) : (
                    <span className="text-danger">Not Answered</span>
                  )}
                </td>
                <td>
                  <Btn title="Edit" onClickBtn={() => handleEdit(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/submit">
          <Btn type="button" title="Submit" />
        </Link>{" "}
        <br /> <br />
      </Container>
    </>
  );
}

export default Preview;
