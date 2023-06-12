import React from 'react';
import RouteContainer from "./component/RouteContainer";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import { useMount } from 'ahooks';
import placebo from './model/Placebo';

export default function App() {

  useMount(() => {
		placebo.user.refreshLoginStatus();
    placebo.user.getLikedSongIds();
  })

  return (
    <div className="app">
      { RouteContainer }
    </div>
  );
}

