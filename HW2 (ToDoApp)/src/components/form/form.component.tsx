import React, { useRef } from "react";
import { ITodoItem } from "../types";
import "./form.css";

interface IProps {
  onSubmit: (item: ITodoItem) => void;
}

const Form = React.memo((props: IProps) => {
  console.log("Re render [form] ");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title: string = e.currentTarget["task"].value;
    const isUrgent: boolean = e.currentTarget["urgent"].checked;
    if (title.length > 3) {
      const newTask: ITodoItem = {
        id: Date.now(),
        title,
        isUrgent,
        isDone: false,
      };
      props.onSubmit(newTask);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  if (inputRef.current) {
    inputRef.current.value = "";
  }

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="typeTodo"
        type="text"
        name="task"
        placeholder="type todo here..."
      />
      <div>
        <input type="checkbox" id="urgent" name="urgent" />
        <label htmlFor="urgent">Urgent</label>
      </div>
      <input className="addTodo" type="submit" value="Add Todo" />
    </form>
  );
});

export default Form;
