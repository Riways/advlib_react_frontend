import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SmallHeader from "../headers/SmallHeader";
import {
  isStringConsistsOfLatinOnly,
  camelCaseToRegular,
} from "../util/Validation";

const UploadBook = () => {
  const UPLOAD_FILE_MAX_SIZE = process.env.REACT_APP_UPLOAD_FILE_SIZE;
  const UPLOAD_BOOK_URL = process.env.REACT_APP_UPLOAD_BOOK_URL;

  const [bookName, setBookName] = useState();
  const [authorFirstName, setAuthorFirstName] = useState();
  const [authorLastName, setAuthorLastName] = useState();
  const [file, setFile] = useState(null);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [isBookNameFilled, setIsBookNameFilled] = useState(false);
  const [isFileValidated, setIsFileValidated] = useState(false);
  const [isBookNameFieldLatin, setIsBookNameFieldLatin] = useState(false);
  const [isAuthorsFirstNameFieldLatin, setIsAuthorsFirstNameFieldLatin] =
    useState(false);
  const [isAuthorsLastNameFieldLatin, setIsAuthorsLastNameFieldLatin] =
    useState(false);
  const [isBookUploading, setIsBookUploading] = useState(false);

  useEffect(() => {}, [error]);

  if (error && success) {
    setSuccess("");
  }

  const FileValidation = (fileInput) => {
    if (fileInput.files.length > 1) {
      setError("You can upload one file at a time");
    } else if (fileInput.files.length === 1) {
      const fileItem = fileInput.files.item(0);
      const fileSize = Math.round(fileItem.size / 1024 / 1024);

      if (fileItem.type !== "text/plain") {
        setIsFileValidated(false);
        setError(
          "Wrong extension. You can upload .txt files smaller than 10 mb"
        );
      } else if (fileSize > UPLOAD_FILE_MAX_SIZE) {
        setIsFileValidated(false);
        setError("File too big. You can upload .txt filessmaller than 10 mb");
      } else {
        setIsFileValidated(true);
        setFile(fileItem);
      }
    }
  };

  const fieldValidation = (target) => {
    const value = target.value;
    const fieldName = camelCaseToRegular(target.name);
    const targetName = target.name;

    if (targetName === "bookName") {
      setBookName(value);
    } else if (targetName === "authorsFirstName") {
      setAuthorFirstName(value);
    } else if (targetName === "authorsLastName") {
      setAuthorLastName(value);
    }

    if (!isStringConsistsOfLatinOnly(value)) {
      setError(
        fieldName + " must consist only of letters of the Latin alphabet"
      );
      setFooByNameAndValue(targetName, false);
      return;
    } else {
      setError("");
      setFooByNameAndValue(targetName, true);
    }

    if (targetName === "bookName") {
      if (value.trim().length === 0) {
        setError("Please fill " + fieldName + " field");
        setIsBookNameFilled(false);
        return;
      } else {
        setIsBookNameFilled(true);
      }
    }
  };

  const setFooByNameAndValue = (name, value) => {
    if (name === "bookName") {
      setIsBookNameFieldLatin(value);
    } else if (name === "authorsFirstName") {
      setIsAuthorsFirstNameFieldLatin(value);
    } else if (name === "authorsLastName") {
      setIsAuthorsLastNameFieldLatin(value);
    }
  };

  const uploadBook = () => {
    setSuccess(null);
    setError(null);
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("authorsFirstName", authorFirstName);
    formData.append("authorsLastName", authorLastName);
    formData.append("uploadedBook", file, file.name);
    setIsBookUploading(true);
    axios
      .post(UPLOAD_BOOK_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setIsBookUploading(false)
        setSuccess(data + " was succesfully uploaded");
      })
      .catch((error) => {
        setIsBookUploading(false)
        setError(error.response.data.message);
      });
      
  };

  return (
    <Container fluid className=" text-center" style={{ maxWidth: 650 }}>
      <SmallHeader />
      <h3>Upload your book</h3>
      <div className="position-relative">
        <input
          type="text"
          className="form-control "
          placeholder="Book Name"
          name="bookName"
          onChange={(e) => {
            fieldValidation(e.target);
          }}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Author first name"
          name="authorsFirstName"
          onChange={(e) => {
            fieldValidation(e.target);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Author last name"
          name="authorsLastName"
          onChange={(e) => {
            fieldValidation(e.target);
          }}
        />
        <input
          type="file"
          className="form-control"
          id="inputGroupFile02"
          name="uploadedBook"
          onChange={(e) => FileValidation(e.target)}
          required
        />
        <div className=" d-flex align-items-center justify-content-end">
          <input
            className="btn m-2 btn-primary align-self-end "
            type="submit"
            value="Upload"
            disabled={
              !isBookNameFilled |
              !isFileValidated |
              !isBookNameFieldLatin |
              !isAuthorsFirstNameFieldLatin |
              !isAuthorsLastNameFieldLatin |
              isBookUploading
            }
            onClick={() => {
              uploadBook();
            }}
          />
        </div>
        {error ? (
          <div>
            <Container className="alert alert-danger">{error}</Container>
          </div>
        ) : (
          <></>
        )}
        {success ? (
          <div>
            <Container className="alert alert-success">{success}</Container>
          </div>
        ) : (
          <></>
        )}
        {isBookUploading? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default UploadBook;
