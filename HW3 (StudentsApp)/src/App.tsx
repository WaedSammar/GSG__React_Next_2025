import "./App.css";
import Main from "./screens/Main.screens";
import About from "./screens/about.screen";
import NotFound from "./screens/NotFound.screen";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

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

  const h1style = { color: "#3a5a40", fontSize: "24px" };

  return (
    <div className="main wrapper">
      <h1 style={h1style}>Welcome to GSG React/Next Course</h1>
      <BrowserRouter>
        <nav>
          <Link to="/">Home Page</Link>
          <Link to="/about">About App</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
