import React, { useEffect, useState } from "react";
import "./Login.scss";
import Cloud from "../utils/Cloud";
import { Button, TextField } from "@mui/material";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let url = `${baseUrl}/login`;

    axios
      .post(url, { email, password })
      .then((res) => {
        let token = res.data;
        token && localStorage.setItem("token", token);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/feed");
    }
  }, []);

  return (
    <main>
      <div className='login'>
        <div>
          <Cloud />
        </div>
        <div>
          <h4>Login to your account</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label='Password'
            name='password'
            variant='outlined'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className='errorMessage'>{error ? error : ""}</p>

          <div className='d-flex justify-content-end'>
            <Button
              variant='outlined'
              className='mt-1 text-capitalize'
              type='submit'
            >
              Lets Go
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
