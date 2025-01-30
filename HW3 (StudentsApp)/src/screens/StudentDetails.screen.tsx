import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IStudent } from "../types";
import Student from "../component/student/student.component";

interface IProps {}

const StudentDetails = (props: IProps) => {
  const { id } = useParams();
  const [currentStudent, setCurrentStudent] = useState<IStudent>();

  useEffect(() => {
    const studentsListStr = localStorage.getItem("students-list");
    if (studentsListStr) {
      const stdList: IStudent[] = JSON.parse(studentsListStr);
      const std = stdList.find((item) => item.id === id);
      if (std) {
        setCurrentStudent(std);
      } else {
      }
    }
  }, [id]);

  const handleAbsentChange = () => {};

  return (
    <div>
      {currentStudent && (
        <Student
          id={currentStudent.id}
          key={currentStudent.id}
          name={currentStudent.name}
          age={currentStudent.age}
          isGraduated={currentStudent.isGraduated}
          coursesList={currentStudent.coursesList}
          onAbsentChange={handleAbsentChange}
          absents={currentStudent.absents}
        />
      )}
    </div>
  );
};

export default StudentDetails;
