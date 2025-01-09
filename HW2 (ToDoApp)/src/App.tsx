import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/dashboard.component";
import Form from "./components/form/form.component";
import TodoList from "./components/todo-list/todo-list.component";
import { ITodoItem } from "./components/types";
import useLocalStorage from "./hooks/local-storage.hook";

function App() {
  const today = new Date().getDate();
  const currentDate = new Date().toLocaleDateString("en-Us", {
    weekday: "long",
  });
  const month = new Date().toLocaleDateString("en-Us", {
    month: "long",
  });

  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [date, setDate] = useState("");

  const { storedData } = useLocalStorage(todos, "todo-list");

  useEffect(() => {
    setTodos(storedData || []);
  }, [storedData]);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date().toTimeString());
    }, 1000);
  }, []);

  const handleNewItem = useCallback(
    (item: ITodoItem) => {
      setTodos([...todos, item]);
    },
    [todos]
  );

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.dataset["itemId"];
    const newTodos = todos.map((item) =>
      item.id === Number(itemId) ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(newTodos);
  };

  const handleDelete = (index: number) => {
    setTodos([
      ...todos.slice(0, index),
      ...todos.slice(index + 1, todos.length),
    ]);
  };
  return (
    <div>
      <h1 className="main">Todo App✍</h1>
      <h4>{date}</h4>
      <p className="date">
        {currentDate}, {today} {month}
      </p>
      <div className="container">
        <Form onSubmit={handleNewItem} />
        <Dashboard items={todos} />
        <TodoList
          items={todos}
          onToggle={handleTaskToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
