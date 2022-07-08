import React from "react";
import { Container } from "react-bootstrap";
import WordListHeader from "./WordListHeader";
import WordListRow from "./WordListRow";

const WordList = ({ wordsToShow, currentPage, wordsOnPage, getPhotoByWord, rowWithImageNumber, imageUrl }) => {
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
          getPhotoByWord={getPhotoByWord}
          rowWithImageNumber={rowWithImageNumber}
          imageUrl={imageUrl}
        />
      ))}
    </Container>
  );
};

export default WordList;
