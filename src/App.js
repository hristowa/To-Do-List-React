import { useEffect, useState } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import "./components/style.css";
import { ToDoList } from "./components/ToDoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    //checking local storage
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    //save the new value to local storage
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    //adds new todo
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    //checkbox
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    //delete
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <div className="container">
        <h1 className="header">To-do List</h1>
        <NewTodoForm onSubmit={addTodo} />
        <h2 className="tasks-header">Tasks:</h2>
        <ToDoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}
