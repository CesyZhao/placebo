import React from 'react';
import RouteContainer from "./component/RouteContainer";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";

export default function App() {
  return (
    <div className="app">
      { RouteContainer }
    </div>
  );
}

