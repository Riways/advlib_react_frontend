import React from "react";
import { Col , Row } from "react-bootstrap";
import WordInfo from "./WordInfo";

const WordListRow = ({
  index,
  word,
  currentPage,
  wordsOnPage,
  getPhotoByWord,
  rowWithImageNumber,
  imageUrl,
  getWordDefinitionFromDictionary,
  wordDefinition,
  setRowWithImageNumber,
}) => {
  const pageIndex = wordsOnPage * (currentPage - 1) + index + 1;
  return (
    <div>
      <Row id="wordListRow">
        <Col xs={2} sm={2} md={2} id="wordListRowCol">
          {pageIndex}
        </Col>
        <Col id="wordListRowCol">{word.word}</Col>
        <Col id="wordListRowCol">{word.counter}</Col>
        {imageUrl && pageIndex === rowWithImageNumber ? (
          <Col xs={2} sm={2} md={2} id="wordListRowCol"> 
            <button
              className="btn btn-link btn-sm"
              onClick={() => {
                setRowWithImageNumber(-1);
              }}
            >
              hide
            </button>
          </Col>
        ) : (
          <Col xs={2} sm={2} md={2} id="wordListRowCol">
            <button
              className="btn btn-link btn-sm"
              onClick={() => {
                getPhotoByWord(word.word, pageIndex);
                getWordDefinitionFromDictionary(word.word);
                setRowWithImageNumber(pageIndex);
              }}
            >
              show
            </button>
          </Col>
        )}
      </Row>
      {imageUrl && pageIndex === rowWithImageNumber ? (
        <WordInfo imageUrl={imageUrl} wordDefinition={wordDefinition} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default WordListRow;
