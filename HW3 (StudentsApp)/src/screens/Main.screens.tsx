import { useEffect, useReducer, useRef } from "react";
import AddForm from "../component/add-form/add-form.component";
import Student from "../component/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import reducer from "../state/reducer";
import { IStudent } from "../types";

const Main = () => {
  const [state, dispatch] = useReducer(reducer, {
    studentsList: [],
    totalAbsents: 0,
  });
  const lastStdRef = useRef<HTMLDivElement>(null);

  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    localStorage.setItem("students-list", JSON.stringify(state.studentsList));
  }, [state.studentsList]);

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    const totalAbs = stdList.reduce((prev, cur) => {
      return prev + cur.absents;
    }, 0);

    dispatch({
      type: "INIT_STUDENT",
      payload: { studentsList: stdList, totalAbsents: totalAbs },
    });
  }, [storedData]);
  const removeFirst = () => {
    dispatch({ type: "REMOVE_FIRST" });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "TOTAL_ABSENT", payload: { id, change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className="stats">
        <button onClick={removeFirst}>Pop Student</button>
        <button onClick={scrollToLast}>Scroll to Last Student</button>
        <b style={{ fontSize: "12px", fontWeight: "100", color: "grey" }}>
          Total Absents {state.totalAbsents}
        </b>
      </div>
      {state.studentsList.map((student) => (
        <Student
          id={student.id}
          key={student.id}
          name={student.name}
          age={student.age}
          isGraduated={student.isGraduated}
          coursesList={student.coursesList}
          onAbsentChange={handleAbsentChange}
          absents={student.absents}
        />
      ))}
      <div ref={lastStdRef}></div>
    </>
  );
};
export default Main;
