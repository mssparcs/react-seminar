import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Todo from "./todo.jsx";
import App from "./App.jsx";
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App mode="index" />}></Route>
              <Route path="/search" element={<App mode="search" />}></Route>
              <Route path="/details" element={<App mode="details" />}></Route>
              <Route path="/todo" element={<Todo />}></Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>
);