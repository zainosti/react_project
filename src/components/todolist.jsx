import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./task";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completed, setcompleted] = useState([]);
  const [incomplete, setincomplete] = useState([]);
  const [ShowCompletedTasks, setShowCompletedTasks] = useState(false);
  const [ShowIncompleteTasks, setShowIncompleteTasks] = useState(false);
  const [item, setitem] = useState(0);
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((resp) => {
        const apiitems = {
          ...resp.data[item],
          completed: false,
          showcompletebtn: true,
          showincompletebtn: false,
        };
        const updatedTasks = [...tasks, apiitems];
        setTasks(updatedTasks);
        console.log(resp.data);
        setitem((item) => item + 1);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      })
      .catch((error) => console.log("error", error));
  };
  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        showcompletebtn: true,
        showincompletebtn: false,
      };

      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setNewTask("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: true,
          showcompletebtn: false,
          showincompletebtn: true,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const incompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: false,
          showcompletebtn: true,
          showincompletebtn: false,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const showCompleted = () => {
    setcompleted(tasks);
  };
  const showIncompleted = () => {
    setincomplete(tasks);
  };
  const handleSelection = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "completed") {
      setShowCompletedTasks(true);
      setShowIncompleteTasks(false);
      showCompleted();
    } else if (selectedValue === "incomplete") {
      setShowCompletedTasks(false);
      setShowIncompleteTasks(true);
      showIncompleted();
    }
  };
  const editTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if ((task.id === taskId) & (newTitle !== "")) {
        return {
          ...task,
          title: newTitle,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className="mainText">
        <h1>Add Your Tasks</h1>
      </div>
      <div className="center">
        <div className="add_tasks">
          <input
            className="task_input"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevents form submission on "Enter" key press
                addTask(); // Call the addTask function when "Enter" is pressed
              }
            }}
          />
          <button className="add_btn" onClick={addTask}>
            Add Task
          </button>
          <button className="submit_btn" onClick={getData}>
            Add Api Data
          </button>
          <select className="status" onChange={handleSelection}>
            <option>Filter</option>
            <option value="completed">Show Completed Tasks</option>
            <option value="incomplete">Show Incomplete Tasks</option>
          </select>
        </div>
      </div>
      <div className="allTasks">
        <div className="alltask">
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            All Tasks
          </h1>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onComplete={completeTask}
              onIncomplete={incompleteTask}
              showcomple={task.showcompletebtn}
              showincomple={task.showincompletebtn}
              onEdit={editTask}
            />
          ))}
        </div>
        {ShowCompletedTasks && (
          <div className="complete">
            {ShowCompletedTasks && <div>Completed Tasks</div>}
            {ShowCompletedTasks &&
              completed.map((ele) => {
                if (ele.completed) {
                  return <div>{ele.title}</div>;
                }
                return null;
              })}
          </div>
        )}
        {ShowIncompleteTasks && (
          <div className="incomplete">
            {ShowIncompleteTasks && <div>InCompleted Tasks</div>}
            {ShowIncompleteTasks &&
              incomplete.map((ele) => {
                if (!ele.completed) {
                  return <div>{ele.title}</div>;
                }
                return null;
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
