import axios from "axios";
import React, { useEffect, useState } from "react";
import { getJwt } from "../login/Login";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmallHeader from "../headers/SmallHeader";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../util/Validation";

const Register = () => {
  const GET_VERIFICATION_CODE_URL =
    process.env.REACT_APP_USER_GET_VERIFICATION_CODE;
  const SAVE_USER_URL = process.env.REACT_APP_USER_SAVE_USER;
  const CHECK_USERNAME_URL = process.env.REACT_APP_USER_CHECK_USERNAME;
  const CHECK_EMAIL_URL = process.env.REACT_APP_USER_CHECK_EMAIL;
  const TIME_FOR_VERIFICATION_IN_SECONDS = 60;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCodeFromServer, setVerificationCodeFromServer] =
    useState("");
  const [insertedVerificationCode, setInsertedVerificationCode] = useState("");

  const [passwordInputType, setPasswordInputType] = useState("password");
  const [secondsLeftForVerification, setSecondsLeftForVerification] =
    useState(0);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isFirstPasswordValid, setIsFirstPasswordValid] = useState(false);
  const [isSecondPasswordValid, setIsSecondPasswordValid] = useState(false);
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isWaitingForVerificationCode, setIsWaitingForVerificationCode] =
    useState(false);
  const [isSuccesfulSignIn, setIsSuccesfulSignin] = useState(false);

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [firstPasswordError, setFirstPasswordError] = useState("");
  const [secondPasswordError, setSecondPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  //is passwords equal
  useEffect(() => {
    if (firstPassword && secondPassword) {
      if (firstPassword !== secondPassword) {
        setError("Passwords do not match");
        setIsPasswordsEqual(false);
      } else {
        setError("");
        setIsPasswordsEqual(true);
      }
    }
  }, [firstPassword, secondPassword]);

  useEffect(() => {}, [error]);

  const checkPassword = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    if (fieldName === "firstPassword") {
      setFirstPassword(value);
    } else if (fieldName === "secondPassword") {
      setSecondPassword(value);
    }

    if (!validatePassword(value)) {
      if (fieldName === "firstPassword") {
        setIsFirstPasswordValid(false);
        setFirstPasswordError(
          "Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters"
        );
      } else if (fieldName === "secondPassword") {
        setIsSecondPasswordValid(false);
        setSecondPasswordError(
          "Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters"
        );
      }
    } else {
      if (fieldName === "firstPassword") {
        setIsFirstPasswordValid(true);
        setFirstPasswordError("");
      } else if (fieldName === "secondPassword") {
        setIsSecondPasswordValid(true);
        setSecondPasswordError("");
      }
    }
  };

  const checkUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!validateUsername(value)) {
      setUsernameError(
        "Username can contain characters a-z, 0-9, underscores and periods. The username cannot start with a period nor end with a period. It must also not have more than one period sequentially. Max length is 30 chars."
      );
      setIsUsernameValid(false);
      return;
    } else {
      setUsernameError("");
      setIsUsernameValid(true);
    }
    const url = CHECK_USERNAME_URL + "/" + value;
    axios
      .get(url)
      .then(({ data }) => {
        if (data) {
          setIsUsernameAvailable(true);
          setUsernameError("");
        } else {
          setIsUsernameAvailable(false);
          setUsernameError("This username is not available");
        }
      })
      .catch(({ error }) => {
        setError(error.response.data.message);
      });
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const timer = async () => {
    let secondsCounter = TIME_FOR_VERIFICATION_IN_SECONDS;
    setSecondsLeftForVerification(secondsCounter);
    while (secondsCounter > 0) {
      secondsCounter -= 1;
      await sleep(1000);
      setSecondsLeftForVerification(secondsCounter);
    }
  };

  const checkEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Email is not valid");
      setIsEmailValid(false);
      return;
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }

    const url = CHECK_EMAIL_URL + "/" + value;
    axios
      .get(url)
      .then(({ data }) => {
        if (data) {
          setIsEmailAvailable(true);
          setEmailError("");
        } else {
          setIsEmailAvailable(false);
          setEmailError("This email is not available");
        }
      })
      .catch(({ error }) => {
        setError(error.response.data.message);
      });
  };

  const passwordVisibilityChanged = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

  const getVerificationCode = () => {
    setIsWaitingForVerificationCode(true);
    timer();
    const formData = new FormData();
    formData.append("email", email);
    axios
      .post(GET_VERIFICATION_CODE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setVerificationCodeFromServer(data);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    setTimeout(() => {
      setError("60 seconds passed");
      setIsWaitingForVerificationCode(false);
      setVerificationCodeFromServer(null);
    }, 60000);
  };

  const isVerificationCodeValid = () => {
    if (insertedVerificationCode !== verificationCodeFromServer) {
      setError("The entered code is wrong");
      return false;
    } else {
      return true;
    }
  };

  const registrateUser = async () => {
    if (!isVerificationCodeValid | !username | !firstPassword | !email) {
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", firstPassword);
    formData.append("email", email);
    await axios
      .post(SAVE_USER_URL, formData)
      .then(({ data }) => {
        setIsSuccesfulSignin(true);
        getJwt(username, firstPassword, setError);
        setTimeout(() => {
          navigate("/");
          setTimeout(() => {document.location.reload();}, 500)
        }, 1500);
        
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <Container className=" text-center" style={{ maxWidth: 450 }}>
      <SmallHeader />
      {isSuccesfulSignIn ? (
        <div id="succesfulSignIn" className="alert alert-success">
          <h3>Welcome, {username}!</h3>
        </div>
      ) : (
        <div id="registerForm">
          <div className=" p-3">
            <h4>Register</h4>
            {usernameError ? (
              <Container className="alert alert-danger">
                {usernameError}
              </Container>
            ) : (
              <></>
            )}
            <p>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                required
                onChange={(e) => checkUsername(e)}
                readOnly={isWaitingForVerificationCode}
              />
            </p>

            {firstPasswordError ? (
              <Container className="alert alert-danger">
                {firstPasswordError}
              </Container>
            ) : (
              <></>
            )}
            <p>
              <input
                type={passwordInputType}
                name="firstPassword"
                className="form-control"
                placeholder="Password"
                required
                onChange={(e) => checkPassword(e)}
                readOnly={isWaitingForVerificationCode}
              />
            </p>

            {secondPasswordError ? (
              <Container className="alert alert-danger">
                {secondPasswordError}
              </Container>
            ) : (
              <></>
            )}
            <p>
              <input
                type={passwordInputType}
                name="secondPassword"
                className="form-control"
                placeholder="Password"
                required
                onChange={(e) => checkPassword(e)}
                readOnly={isWaitingForVerificationCode}
              />
            </p>
            {emailError ? (
              <Container className="alert alert-danger">{emailError}</Container>
            ) : (
              <></>
            )}
            <p>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={(e) => checkEmail(e)}
                readOnly={isWaitingForVerificationCode}
              />
            </p>
            <div>
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => passwordVisibilityChanged(e)}
                />
                <label className="form-check-label">Show password</label>
              </div>
              <input
                type="submit"
                value="Submit"
                className=" my-2 btn btn-primary"
                disabled={
                  !isUsernameValid |
                  !isFirstPasswordValid |
                  !isSecondPasswordValid |
                  !isPasswordsEqual |
                  !isEmailValid |
                  !isUsernameAvailable |
                  !isEmailAvailable |
                  isWaitingForVerificationCode
                }
                onClick={() => getVerificationCode()}
              />
            </div>

            {isWaitingForVerificationCode ? (
              <div id="verificationCodeWindow" className="mt-2 pt-4 ">
                <p className="alert alert-warning">
                  Verification code was sent on your email, please type it here:
                </p>
                <input
                  type="text"
                  name="verificationCode"
                  className="form-control"
                  placeholder="Verification code"
                  required
                  onChange={(e) => setInsertedVerificationCode(e.target.value)}
                />
                <input
                  type="submit"
                  value="Sign in"
                  className=" my-2 btn btn-primary"
                  onClick={() => registrateUser()}
                />
                <p>{secondsLeftForVerification}</p>
              </div>
            ) : (
              <></>
            )}

            {error ? (
              <Container className="alert alert-danger">{error}</Container>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Register;
