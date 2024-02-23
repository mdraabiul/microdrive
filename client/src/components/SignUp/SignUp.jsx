import React, { useState } from "react";
import "./SignUp.scss";
import Cloud from "../utils/Cloud";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordErrorEvent, setPasswordErrorEvent] = useState(false);
  const [emailErrorEvent, setEmailErrorEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (email.length < 1) {
      setError("Email field is empty");
      setEmailErrorEvent(true);
    } else if (email.includes(" ")) {
      setError("Email field is empty");
      setEmailErrorEvent(true);
    } else if (password.length < 1) {
      setError("Password field is empty");
      setPasswordErrorEvent(true);
    } else if (password.includes(" ")) {
      setError("Password field is empty");
      setPasswordErrorEvent(true);
    } else {
      setLoading(true);
      const url = `${baseUrl}/signup`;
      try {
        const res = await axios.post(url, { email, password });
        if (res.data) {
          setLoading(false);
          navigate("/login", { replace: true });
        }
      } catch (err) {
        setLoading(false);
        setError(err.response.data);
      }
    }
  };

  return (
    <main className='signup'>
      <div className='signupBox'>
        <div style={{ height: "50px" }}>
          {loading ? <SyncLoader size={10} color='orange' /> : <Cloud />}
        </div>
        <div className='title'>
          <h4>Create a Micro Drive Account</h4>
        </div>
        <form onSubmit={handleSignUp}>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            color={emailErrorEvent ? "error" : "primary"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='password'
            name='password'
            type='password'
            variant='outlined'
            color={passwordErrorEvent ? "error" : "primary"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='errorMessage'>
            <p>{error ? error : ""}</p>
          </div>
          <div className='submit'>
            <Button variant='contained' type='submit'>
              Next
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
