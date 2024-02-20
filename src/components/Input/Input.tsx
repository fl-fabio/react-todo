import React, { useState } from "react";
import "./Input.css";
import { Todo } from "../../types/Todo";

const Input = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { id: Date.now(), title: inputValue, completed: false },
    ]);

  };

  const handleComplete = (index: number) => {
    setTodos((oldTodos) => {
      return oldTodos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }

  const handleDelete = (index: number) => {
    setTodos((oldTodos) => oldTodos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="row">
        <div className="col-4 m-5">
          <label>Todo</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control d-inline"
              placeholder="todo"
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={handleClick}>
              Add
            </button>
          </div>
          <br />
        </div>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <div key={index}>
            <li style={{ listStyle: "none", textDecoration: todo.completed ? "line-through" : "none", fontSize: "30px" }}>
              {todo.title + "   -  "}
              <button className="btn btn-danger" onClick={() => handleComplete(index)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button className="btn btn-warning" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Input;
