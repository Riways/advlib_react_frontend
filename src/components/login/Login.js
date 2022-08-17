import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SmallHeader from "../headers/SmallHeader";

const LOGIN_PAGE_URL = process.env.REACT_APP_LOGIN_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isCheckingTypedCredentials, setIsCheckingTypedCredentials] =
    useState(false);
  const [isSuccesfulLoggedIn, setisSuccesfulLoggedIn] = useState(false);

  const getJwt = () => {
    setIsCheckingTypedCredentials(true);
    axios(LOGIN_PAGE_URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { username: username, password: password },
      method: "post",
    })
      .then(({ data }) => {
        setisSuccesfulLoggedIn(true);
        setIsCheckingTypedCredentials(false);
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          document.location.replace("/");
        }, 1500);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsCheckingTypedCredentials(false);
      });
  };

  return (
    <Container className=" text-center" style={{ maxWidth: 450 }}>
      <SmallHeader />
      {isSuccesfulLoggedIn ? (
        <div id="succesfulSignIn" className="alert alert-success">
          <h3>Welcome, {username}!</h3>
        </div>
      ) : (
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
                disabled={isCheckingTypedCredentials}
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
            {isCheckingTypedCredentials ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <></>
            )}
            <div id="loginHint">
              <div>Default login: <h6 class="d-inline-block">root</h6></div>
              Default password: <h6 class="d-inline-block">groot</h6>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

const getJwt = async (username, password, setError) => {
  await axios(LOGIN_PAGE_URL, {
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
export { getJwt };
