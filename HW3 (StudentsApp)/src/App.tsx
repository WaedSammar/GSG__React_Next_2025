import "./App.css";
import Main from "./screens/Main.screens";
import About from "./screens/about.screen";
import NotFound from "./screens/NotFound.screen";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import StudentDetails from "./screens/StudentDetails.screen";


function App() {
  const h1style = { color: "#3a5a40", fontSize: "24px" };

  return (
    <div className="main wrapper">
      <h1 style={h1style}>Welcome to GSG React/Next Course</h1>
      <BrowserRouter>
        <nav>
          <Link to="/">Home Page</Link>
          <Link to="/add">Add Student</Link>
          <Link to="/about">About App</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="student/:id" element={<StudentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
