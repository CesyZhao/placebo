import React from 'react';
import RouteContainer from "./component/RouteContainer";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Controller from "./component/Controller";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<RouteContainer />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

