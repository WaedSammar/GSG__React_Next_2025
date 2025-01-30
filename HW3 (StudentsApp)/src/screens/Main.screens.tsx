import { useEffect, useReducer, useRef, useState } from "react";
import AddForm from "../component/add-form/add-form.component";
import Student from "../component/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import reducer from "../state/reducer";
import { IStudent } from "../types";
import { useSearchParams } from "react-router-dom";

// const COURSES_LIST: string[] = ["React", "HTML", "CSS"];
// const INITIAL_LIST: Array<IStudent> = [
//   {
//     id: "2401",
//     name: "Waad Amer",
//     age: 20,
//     isGraduated: false,
//     coursesList: ["Math", "English"],
//     absents: 0,
//   },
//   {
//     id: "2402",
//     name: "Seba Rabee",
//     age: 18,
//     isGraduated: false,
//     coursesList: ["Web Dev", "Science", "React", "HTML", "Science"],
//     absents: 0,
//   },
//   {
//     id: "2403",
//     name: "Sayyaf Sammar",
//     age: 24,
//     isGraduated: true,
//     coursesList: COURSES_LIST,
//     absents: 0,
//   },
//   {
//     id: "2404",
//     name: "Abood Mohammad",
//     age: 15,
//     isGraduated: false,
//     coursesList: COURSES_LIST,
//     absents: 0,
//   },
// ];

const Main = () => {
  const [state, dispatch] = useReducer(reducer, {
    studentsList: [],
    totalAbsents: 0,
  });
  const lastStdRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useSearchParams();
  const [filteredList, setFilteredList] = useState<IStudent[]>(
    state.studentsList
  );
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

  useEffect(() => {
    const query = params.get("q") || "";
    if (query) {
      setFilteredList(
        state.studentsList.filter((std) =>
          std.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredList(state.studentsList);
    }
  }, [params, state.studentsList]);

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    params.set("q", query);
    setParams(params);
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
      <div className="filters">
        <input type="text" placeholder="Search" onChange={handleSearch} value={params.get('q') || ''} />
      </div>
      {filteredList.map((student) => (
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
