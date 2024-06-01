import React from "react";
import Input from "../components/InputField/Input";
import Btn from "../components/Button/Btn";

function EditQuestionForm({
  formData,
  setFormData,
  handleFormSubmit,
  cancelEdit,
}) {
  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const inputFields = [
    {
      name: "subject_id",
      label: "Subject Id",
      placeholder: "Enter subject id",
      value: formData.subject_id,
    },
    {
      name: "question",
      label: "Question",
      placeholder: "Enter question",
      value: formData.question,
      type: "textarea",
    },
    {
      name: "option1",
      label: "Option 1",
      placeholder: "Enter option1",
      value: formData.option1,
    },
    {
      name: "option2",
      label: "Option 2",
      placeholder: "Enter option2",
      value: formData.option2,
    },
    {
      name: "option3",
      label: "Option 3",
      placeholder: "Enter option3",
      value: formData.option3,
    },
    {
      name: "option4",
      label: "Option 4",
      placeholder: "Enter option4",
      value: formData.option4,
    },
    {
      name: "correct_option",
      label: "Correct Option",
      placeholder: "Enter correct option",
      value: formData.correct_option,
    },
  ];

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="shadow-lg p-5 bg-white w-75">
        <form onSubmit={handleFormSubmit} className="form-body">
          <div className="text-center mb-4">
            <h2>Edit Question</h2>
          </div>
          <div className="row">
            {inputFields.map((field, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  field.name.includes("option") ? "col-md-6" : "col-12"
                }`}
              >
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(value) => handleChange(field.name, value)}
                />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <Btn title="Save Changes" type="submit" />
            <Btn title="Cancel" type="button" onClickBtn={cancelEdit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuestionForm;
