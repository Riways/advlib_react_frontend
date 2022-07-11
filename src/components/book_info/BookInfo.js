import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Header from "../headers/Header";
import PaginationBar from "../pagination_bar/PaginationBar";
import SegmentedPaginationBar from "../pagination_bar/SegmentedPaginationBar";
import CommonInfo from "./CommonInfo";
import WordList from "./WordList";

const BookInfo = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("bookId");
  const bookName = searchParams.get("bookName");

  const WORDS_URL = process.env.REACT_APP_WORDS_URL + bookId;

  const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
  const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

  const DICTIONARY_API_URL = process.env.REACT_APP_DICTIONARY_API_URL;
  const DICTIONARY_API_KEY = process.env.REACT_APP_DICTIONARY_API_KEY;

  const [words, setWords] = useState([]);
  const [book, setBook] = useState();
  const [error, setError] = useState(null);
  const [wordsToShow, setWordsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSummary, setPagesSummary] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [rowWithImageNumber, setRowWithImageNumber] = useState();
  const [wordDefinition, setWordDefinition] = useState();

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
        const wordsFromData = data.words;
        const arrToShow = [...wordsFromData.slice(0, wordsOnPage)];
        setWordsToShow(arrToShow);
        setWords([...wordsFromData]);
        setBook(data.book);
        if (data.length % wordsOnPage === 0) {
          setPagesSummary(Number.parseInt(wordsFromData.length / wordsOnPage));
        } else {
          setPagesSummary(
            Number.parseInt(wordsFromData.length / wordsOnPage + 1)
          );
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getPhotoByWord = async (word) => {
    setImageUrl(null)
    const IMAGE_URL = `${UNSPLASH_API_URL}random?query=${word}&client_id=${UNSPLASH_KEY}`;
    await axios
      .get(IMAGE_URL)
      .then(({ data }) => {
        setImageUrl(data.urls.small);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getWordDefinitionFromDictionary = async (word) => {
    setWordDefinition(null)
    const WORD_FROM_DICTIONARY_URL = `${DICTIONARY_API_URL}${word}?key=${DICTIONARY_API_KEY}`;
    await axios
      .get(WORD_FROM_DICTIONARY_URL, {
        transformRequest: (data, headers) => {
          delete headers.common["Authorization"];
          return data;
        },
      })
      .then(({ data }) => {
        setWordDefinition(data[0].shortdef);
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
      {book ? (
        <CommonInfo book={book} wordsConsistingEightyPercent={words.length} />
      ) : (
        <></>
      )}
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
          <WordList
            wordsToShow={wordsToShow}
            currentPage={currentPage}
            wordsOnPage={wordsOnPage}
            getPhotoByWord={getPhotoByWord}
            rowWithImageNumber={rowWithImageNumber}
            imageUrl={imageUrl}
            getWordDefinitionFromDictionary={getWordDefinitionFromDictionary}
            wordDefinition={wordDefinition}
            setRowWithImageNumber={setRowWithImageNumber}
          />
          {pagesSummary > 7 ? (
            <SegmentedPaginationBar
              className="mt-3"
              changeShowedWords={changeShowedWords}
              currentPage={currentPage}
              pagesSummary={pagesSummary}
            />
          ) : (
            <PaginationBar
              className="mt-3"
              changeShowedWords={changeShowedWords}
              currentPage={currentPage}
              pagesSummary={pagesSummary}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default BookInfo;
