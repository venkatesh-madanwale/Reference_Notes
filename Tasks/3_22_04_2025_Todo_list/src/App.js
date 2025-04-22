
import React, { useState } from "react";
import "./App.css"
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");  // For new task input
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited

  const handleAddTask = () => {
    if (currentTask.trim() === "") return; // Avoid adding empty tasks
    const newTask = {
      id: Date.now(),  // Using timestamp as a unique ID
      text: currentTask,
    };
    setTasks([...tasks, newTask]);
    setCurrentTask(""); // Reset the input field
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);  // Set the task being edited
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setCurrentTask(taskToEdit.text); // Fill input with current task text
  };

  const handleSaveTask = () => {
    if (currentTask.trim() === "") return;  // Avoid empty text
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: currentTask } : task
      )
    );
    setEditingTaskId(null); // Reset editing state
    setCurrentTask(""); // Reset input field
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        type="text"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        placeholder="Enter a task"
      />

      <button onClick={editingTaskId ? handleSaveTask : handleAddTask}>
        {editingTaskId ? "Save Task" : "Add Task"}
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
