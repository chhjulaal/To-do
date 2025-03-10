import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() !== "") {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (index) => {
    const newText = prompt("Edit Task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      setTasks(
        tasks.map((task, i) =>
          i === index ? { ...task, text: newText } : task
        )
      );
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-white">To-Do List</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter Your Task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          + Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => updateTask(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => toggleTask(index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
