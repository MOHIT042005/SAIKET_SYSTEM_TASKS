import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ADD OR UPDATE TASK
  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput("");
  };

  // DELETE TASK
  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // EDIT TASK
  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  // TOGGLE COMPLETE
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo App ✅</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />

            {/* TASK TEXT */}
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginLeft: "10px"
              }}
            >
              {task.text}
            </span>

            {/* BUTTONS */}
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;