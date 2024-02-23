import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Poster from "./components/Poster/Poster.jsx";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Feed from "./components/Feed/Feed";

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Poster />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/feed' element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
