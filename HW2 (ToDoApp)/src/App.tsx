import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard.component";
import Form from "./components/form/form.component";
import TodoList from "./components/todo-list/todo-list.component";
import { ITodoItem } from "./components/types";
import useLocalStorage from "./hooks/local-storage.hook";
import reducer from "./state/reducer";
import { ThemeContext } from "./main";

function App() {
  const today = new Date().getDate();
  const currentDate = new Date().toLocaleDateString("en-Us", {
    weekday: "long",
  });
  const month = new Date().toLocaleDateString("en-Us", {
    month: "long",
  });
  // const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [date, setDate] = useState("");
  const timerRef = useRef<number>();

  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    userName: "Ali",
  });
  const { theme, setTheme } = useContext(ThemeContext);
  const { storedData } = useLocalStorage(state.todos, "todo-list");

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#fff" : "#000";
  }, [theme]);

  useEffect(() => {
    dispatch({ type: "INIT_TODO", payload: storedData || [] });
  }, [storedData]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDate(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const stopTime = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleNewItem = useCallback(
    (item: ITodoItem) => {
      dispatch({ type: "ADD_TODO", payload: item });
    },
    [state.todos]
  );

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = Number(e.target.dataset["itemId"]);
    dispatch({ type: "TOGGLE_TODO", payload: itemId });
  };

  const handleDelete = (index: number) => {
    const itemId = state.todos[index].id;
    dispatch({ type: "REMOVE_TODO", payload: itemId });
  };

  const toggleTheme = () => {
    setTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <h1 className="main">Todo App✍</h1>
      <h4>
        {date}
        <button onClick={stopTime}>Stop</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </h4>
      <p className="date">
        {currentDate}, {today} {month}
      </p>
      <div className="container">
        <Form onSubmit={handleNewItem} />
        <Dashboard items={state.todos} />
        <TodoList
          items={state.todos}
          onToggle={handleTaskToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
