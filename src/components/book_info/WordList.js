import React from "react";
import { Container } from "react-bootstrap";
import WordListHeader from "./WordListHeader";
import WordListRow from "./WordListRow";

const WordList = ({ wordsToShow, currentPage, wordsOnPage }) => {
  return (
    <Container>
      <WordListHeader />
      {wordsToShow.map((word, index) => (
        <WordListRow
          wordsOnPage={wordsOnPage}
          currentPage={currentPage}
          key={index}
          index={index}
          word={word}
        />
      ))}
    </Container>
  );
};

export default WordList;
