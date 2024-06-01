import React, { useState, useEffect } from "react";
import Header2 from "../components/Header/Header2";
import Input from "../components/InputField/Input";
import Btn from "../components/Button/Btn";
import EditQuestionForm from "./EditQuestionForm";

function Admin() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    ques_no: null,
    subject_id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: "",
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData(100);
  }, []);

  const fetchData = (subject) => {
    const url = `http://localhost:5000/?subject_id=${subject}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.data.filter(
          (question) => question.subject_id === subject
        );
        setQuestions(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    formData.ques_no ? updateQuestion(formData) : addQuestion(formData);
  };

  const updateQuestion = (formData) => {
    fetch("http://localhost:5000/updateData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        resetForm();
        fetchData(formData.subject_id);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  const addQuestion = (formData) => {
    fetch("http://localhost:5000/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        resetForm();
        fetchData(formData.subject_id);
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  const resetForm = () => {
    setEditMode(false);
    setFormData({
      ques_no: null,
      subject_id: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct_option: "",
    });
  };

  const editRow = (ques_obj) => {
    setEditMode(true);
    setFormData(ques_obj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <br />

      {editMode ? (
        <EditQuestionForm
          formData={formData}
          setFormData={setFormData}
          handleFormSubmit={handleFormSubmit}
          cancelEdit={resetForm}
        />
      ) : (
        <section className="mb-5">
          <div className="container d-flex justify-content-center align-items-center">
            <div className="shadow-lg p-5 bg-white w-100">
              <form
                onSubmit={handleFormSubmit}
                id="quizForm"
                className="form-body"
              >
                <div className="text-center mb-4">
                  <h2>Add Question</h2>
                </div>
                <div className="mb-3">
                  <Input
                    label="Subject Id"
                    type="text"
                    name="subject_id"
                    id="subjectSelect"
                    placeholder="Enter subject id"
                    value={formData.subject_id}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    label="Question"
                    type="textarea"
                    name="question"
                    className="form-control"
                    placeholder="Enter question"
                    rows="2"
                    cols="6"
                    value={formData.question}
                    onChange={handleChange}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Input
                      label="Option 1"
                      type="text"
                      name="option1"
                      placeholder="Enter option1"
                      value={formData.option1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Option 2"
                      type="text"
                      name="option2"
                      placeholder="Enter option2"
                      value={formData.option2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Input
                      label="Option 3"
                      type="text"
                      name="option3"
                      placeholder="Enter option3"
                      value={formData.option3}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Option 4"
                      type="text"
                      name="option4"
                      placeholder="Enter option4"
                      value={formData.option4}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Input
                    label="Correct Option"
                    type="text"
                    name="correct_option"
                    placeholder="Enter correct option"
                    value={formData.correct_option}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <Btn
                    title={
                      formData.ques_no ? "Update Question" : "Add Question"
                    }
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
      <br />
      <Header2 fetchData={fetchData} />
      <section>
        <div style={{ margin: "5%" }}>
          <table className="table table-bordered table-striped">
            <thead className="text-center">
              <tr>
                <th>Question No</th>
                <th>Subject Id</th>
                <th>Question</th>
                <th>Option1</th>
                <th>Option2</th>
                <th>Option3</th>
                <th>Option4</th>
                <th>Correct answer</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.ques_no}>
                  <td>{question.ques_no}</td>
                  <td>{question.subject_id}</td>
                  <td>{question.question}</td>
                  <td>{question.option1}</td>
                  <td>{question.option2}</td>
                  <td>{question.option3}</td>
                  <td>{question.option4}</td>
                  <td>{question.correct_option}</td>
                  <td>
                    <Btn title="Edit" onClickBtn={() => editRow(question)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Admin;
