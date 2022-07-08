import React from "react";
import { Container } from "react-bootstrap";
import WordListHeader from "./WordListHeader";
import WordListRow from "./WordListRow";

const WordList = ({
  wordsToShow,
  currentPage,
  wordsOnPage,
  getPhotoByWord,
  rowWithImageNumber,
  imageUrl,
  getWordDefinitionFromDictionary,
  wordDefinition
}) => {
  return (
    <Container>
      <WordListHeader />
      {wordsToShow.map((word, index) => (
        //TODO Separate rows on two types
        <WordListRow
          wordsOnPage={wordsOnPage}
          currentPage={currentPage}
          key={index}
          index={index}
          word={word}
          getPhotoByWord={getPhotoByWord}
          rowWithImageNumber={rowWithImageNumber}
          imageUrl={imageUrl}
          getWordDefinitionFromDictionary={getWordDefinitionFromDictionary}
          wordDefinition={wordDefinition}
        />
      ))}
    </Container>
  );
};

export default WordList;
