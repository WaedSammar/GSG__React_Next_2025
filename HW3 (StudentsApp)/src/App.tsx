import { useState } from "react";
import "./App.css";
import Main from "./screens/Main.screens";
import About from "./screens/about.screen";
import NotFound from "./screens/NotFound.screen";

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

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const h1style = { color: "#3a5a40", fontSize: "24px" };

  return (
    <div className="main wrapper">
      <h1 style={h1style}>Welcome to GSG React/Next Course</h1>
      <nav>
        <button onClick={() => setCurrentPage("main")}>Home Page</button>
        <button onClick={() => setCurrentPage("about")}>About App</button>
      </nav>
      {currentPage === "main" ? (
        <Main />
      ) : currentPage === "about" ? (
        <About />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default App;
