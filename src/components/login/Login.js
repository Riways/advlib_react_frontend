import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SmallHeader from "../headers/SmallHeader";
import { useNavigate } from "react-router-dom";

const LOGIN_PAGE_URL = process.env.REACT_APP_LOGIN_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getJwt = () => {
    axios(LOGIN_PAGE_URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { username: username, password: password },
      method: "post",
    })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/", { replace: true });
        document.location.reload();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <Container className=" text-center" style={{ maxWidth: 450 }}>
      <SmallHeader />
      <div id="loginForm">
        <div className=" p-3">
          <h4>Log In</h4>
          <p>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <input
              type="submit"
              value="Login"
              className="mx-2 btn btn-primary"
              onClick={() => {
                getJwt();
              }}
            />
            <a href="/register">Register</a>
          </p>
          {error ? (
            <Container className="alert alert-danger">{error}</Container>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Container>
  );
};

const getJwt = (username, password, setError) => {
  axios(LOGIN_PAGE_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { username: username, password: password },
    method: "post",
  })
    .then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
};

export default Login;
export {getJwt}
