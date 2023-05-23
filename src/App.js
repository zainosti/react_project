import React from "react";
import TodoList from "./components/todolist";
import { Routes, Route } from "react-router-dom";
import APIDATA from "./components/apidata";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
function APP() {
  return (
    <Routes>
      <Route
        path="/apiData"
        element={
          <>
            <>
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="/">To Do List</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/apiData">APIDATA</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
            </>
            <APIDATA />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <>
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="/">To Do List</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/apiData">APIDATA</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
            </>
            <div className="main-container">
              <TodoList />
            </div>
          </>
        }
      />
    </Routes>
  );
}
export default APP;
