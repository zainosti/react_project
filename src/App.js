import React from "react";
import TodoList from "./components/todolist";
import { Routes, Route } from "react-router-dom";
import APIDATA from "./components/apidata";
import "./App.css";
function APP() {
  return (
    <Routes>
      <Route path="/apiData" element={<APIDATA />} />
      <Route path="/yourTasks" element={<TodoList />} />
    </Routes>
  );
}
export default APP;
