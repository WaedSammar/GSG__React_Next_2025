import { useEffect, useState } from "react";
import "./add-form.css";
import { IStudent } from "../../types";
import CoursesListForm from "../courses-list-form/courses-list-form-component";
import { validateStudent } from "../../utils/validation";
import useStudentForm from "../../hooks/student-form.hook";

interface IProps {
  className?: string;
  onSubmit: (std: IStudent) => void;
}
const AddForm = (props: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Hello from Add Form component!");
  }, []);

  const formHook = useStudentForm(
    props.onSubmit,
    validateStudent
  );

  return (
    <div className={`wrapper ${props.className} ${isOpen ? "open" : "closed"}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span>&and; Close</span> : <span>&or; Open</span>} Add Form
      </button>
      <div className="input">
        <label htmlFor="name">Student Name: </label>
        <input
          id="name"
          type="text"
          value={formHook.state.name}
          onChange={(e) => formHook.handleChange("name", e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="age">Student Age: </label>
        <input
          id="age"
          type="number"
          min={17}
          max={40}
          value={formHook.state.age}
          onChange={(e) => formHook.handleChange("age", e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="isGraduated">Is Student Graduated: </label>
        <input
          id="isGraduated"
          type="checkbox"
          checked={formHook.state.isGraduated}
          onChange={(e) =>
            formHook.handleChange("isGraduated", e.target.checked)
          }
        />
      </div>
      <div>
        <CoursesListForm
          value={formHook.state.coursesList}
          onSubmit={formHook.handleCoursesChange}
        />
      </div>
      <div className="Actions">
        <button onClick={formHook.handleSubmit}>Submit</button>
        <button onClick={formHook.handleClear}>Clear</button>
      </div>
      {formHook.errorsList.length > 0 && (
        <div>
          <h4>You have the following errors</h4>
          {formHook.errorsList.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddForm;
