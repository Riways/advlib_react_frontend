import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import Header from "../headers/Header";
import BookList from "./BookList";
import Welcome from "./Welcome";
import LazyButton from "./LazyButton";
import { sleep } from "../util/Util";

const Home = () => {
  const BOOKS_URL = process.env.REACT_APP_BOOKS_URL;
  const DELETE_BOOK_URL = process.env.REACT_APP_DELETE_BOOK_URL;

  const isLogged = localStorage.getItem("isLoggedIn");

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isBackendBootstrapped, setisBackendBootstrapped] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const removeBookById = (bookId) => {
    axios
      .delete(`${DELETE_BOOK_URL}${bookId}`)
      .then(({ data }) => {
        if (bookId === data) {
          const updatedBooks = books.filter((book) => book.id !== bookId);
          setBooks(updatedBooks);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };
  const getBooks = async () => {
    await axios(BOOKS_URL)
      .then(({ data }) => {
        if (data.errors) {
          throw new Error(data.errors);
        }
        setisBackendBootstrapped(true);
        setBooks([...data]);
      })
      .catch((error) => {
        setError(error);
      });
    setIsInitialized(true);
  };

   

  useEffect(() => {
     getBooks();
      
  }, []);

  return (
    <Container fluid className="text-center">
      <Header />
      <h3 className="mt-5">Uploaded books</h3>

      {!books.length && isInitialized? (
        error ? (
          <Container className="alert alert-danger">{error.message}</Container>
        ) : (
          <>
            {isBackendBootstrapped ? (
              <></>
            ) : (
              <Container className="alert alert-danger">
                <p>
                  Heroku turns application to sleep after 1 hour of inactivity.
                  Please wait a minute until backend will bootstrap itself.
                </p>
              </Container>
            )}
            <Welcome />
          </>
        )
      ) : (
        <>
          <BookList books={books} removeBookById={removeBookById} />
          {isLogged ? <></> : <LazyButton error={error} />}
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Home;
