import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Header from "../headers/Header";
import PaginationBar from "../pagination_bar/PaginationBar";
import WordList from "./WordList";

const BookInfo = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("bookId");
  const bookName = searchParams.get("bookName");

  const WORDS_URL = process.env.REACT_APP_WORDS_URL + bookId;

  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [wordsToShow, setWordsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSummary, setPagesSummary] = useState(null);

  const wordsOnPage = 40;

  const changeShowedWords = (pageNumber) => {
    const start = (pageNumber - 1) * wordsOnPage;
    const end = start + wordsOnPage;
    const arrToShow = [...words.slice(start, end)];
    setWordsToShow(arrToShow);
    setCurrentPage(pageNumber);
  };

  const getWords = () => {
    axios(WORDS_URL)
      .then(({ data }) => {
        const arrToShow = [...data.slice(0, wordsOnPage)];
        setWordsToShow(arrToShow);
        setWords([...data]);

        if (data.length % wordsOnPage === 0) {
          setPagesSummary(Number.parseInt(data.length / wordsOnPage));
        } else {
          setPagesSummary(Number.parseInt(data.length / wordsOnPage + 1));
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <Container fluid className="text-center">
      <Header />
      <h1>{bookName}</h1>
      {!wordsToShow.length ? (
        error ? (
          <Container className="alert alert-danger">{error.message}</Container>
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>{" "}
          </div>
        )
      ) : (
        <div>
          <WordList wordsToShow={wordsToShow} currentPage={currentPage}  wordsOnPage={wordsOnPage}/>
          <PaginationBar
            className="mt-3"
            changeShowedWords={changeShowedWords}
            currentPage={currentPage}
            pagesSummary={pagesSummary}
          />
        </div>
      )}
    </Container>
  );
};

export default BookInfo;
