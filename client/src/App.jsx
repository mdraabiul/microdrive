import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Poster from "./components/Poster/Poster.jsx";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Feed from "./components/Feed/Feed";
import { jwtDecode } from "jwt-decode";
import { addUser } from "./features/user/userSlice";
function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      dispatch(addUser(decodedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Poster />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/feed' element={<Feed user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
