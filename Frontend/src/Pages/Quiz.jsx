import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Btn from "../components/Button/Btn";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Quiz() {
  const { selectedOption, setSelectedOption, questions, setQuestions } =
    useContext(UserContext);
  const { subject, index, id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(index, 10) || 0
  );

  useEffect(() => {
    fetchQuizData(id);
  }, [subject, id]);

  const fetchQuizData = async (subject_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/subject?subject_id=${subject_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject_id }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestions(data.data || []);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/preview");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleOptionChange = (event) => {
    const questionIndex = currentQuestionIndex;
    setSelectedOption({
      ...selectedOption,
      [questionIndex]: event.target.value,
    });
  };

  const currentQuestion =
    questions && questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <Container
      className="w-50 border mt-5 p-2"
      style={{
        borderRadius: "10px",
        boxShadow: "0 20px 15px rgba(0,0,0,0.5)",
      }}
    >
      <p className="text-end text-danger">
        Number of Question: {currentQuestionIndex + 1}/{questions.length}
      </p>
      {/* <h1 className="text-center">{currentQuestion.subject_name}</h1> */}

      {currentQuestion ? (
        <div className="p-3">
          <h3>
            Q{currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value={currentQuestion.option1}
                checked={
                  selectedOption[currentQuestionIndex] ===
                  currentQuestion.option1.toString()
                }
                onChange={handleOptionChange}
              />{" "}
              {currentQuestion.option1}
            </label>
          </div>{" "}
          <br />
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value={currentQuestion.option2}
                checked={
                  selectedOption[currentQuestionIndex] ===
                  currentQuestion.option2.toString()
                }
                onChange={handleOptionChange}
              />{" "}
              {currentQuestion.option2}
            </label>
          </div>{" "}
          <br />
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value={currentQuestion.option3}
                checked={
                  selectedOption[currentQuestionIndex] ===
                  currentQuestion.option3.toString()
                }
                onChange={handleOptionChange}
              />{" "}
              {currentQuestion.option3}
            </label>
          </div>{" "}
          <br />
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value={currentQuestion.option4}
                checked={
                  selectedOption[currentQuestionIndex] ===
                  currentQuestion.option4.toString()
                }
                onChange={handleOptionChange}
              />{" "}
              {currentQuestion.option4}
            </label>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <div className="d-flex justify-content-between p-2">
          <Btn
            onClickBtn={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            title="Previous"
          />
          {currentQuestionIndex === questions.length - 1 ? (
            <Btn
              className="btn btn-primary"
              onClickBtn={() => navigate("/preview")}
              title="Preview"
            />
          ) : (
            <Btn
              onClickBtn={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              title="Next"
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default Quiz;
