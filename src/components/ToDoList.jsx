import React, { useState } from 'react'
import './ToDoList.css';

    function ToDoList() {

        const [tasks, setTasks] = useState([
          { text: "Eat breakfast", completed: false },
          { text: "Take a shower", completed: false },
          { text: "Walk the dog", completed: false },
        ]);

        const [newTask, setNewTask] = useState("");

        function handleInputChange(event) {
          setNewTask(event.target.value);
        }

        function addTask() {
          if (newTask.trim() !== "") {
            setTasks((t) => [...t, { text: newTask, completed: false }]);
            setNewTask("");
          }
        }

        function deleteTask(index) {
          const updateTasks = tasks.filter((element, i) => i !== index);
          setTasks(updateTasks);
        }

        function moveTaskUp(index) {
          if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [
              updatedTasks[index - 1],
              updatedTasks[index],
            ];
            setTasks(updatedTasks);
          }
        }

        function moveTaskDown(index) {
          if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [
              updatedTasks[index + 1],
              updatedTasks[index],
            ];
            setTasks(updatedTasks);
          }
        }

        function toggleTaskCompletion(index) {
          const updatedTasks = [...tasks];
          updatedTasks[index].completed = !updatedTasks[index].completed;
          setTasks(updatedTasks);
        }

        return (
          <>
            <div className="to-do-list">
              <h1>To-Do-List</h1>
              <div>
                <input
                  type="text"
                  placeholder="Enter a task..."
                  value={newTask}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask();
                    }
                  }}
                />
                <button className="add-button" onClick={addTask}>
                  Add
                </button>
              </div>

              <ol>
                {tasks.map((task, index) => (
                  <li key={index} className={task.completed ? "completed" : ""}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <span>{task.text}</span>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                    <button onClick={() => moveTaskUp(index)}>Up</button>
                    <button onClick={() => moveTaskDown(index)}>Down</button>
                  </li>
                ))}
              </ol>
            </div>
          </>
        );
    }

export default ToDoList