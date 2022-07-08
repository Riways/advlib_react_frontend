import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import WordInfo from "./WordInfo";

const WordListRow = ({
  index,
  word,
  currentPage,
  wordsOnPage,
  getPhotoByWord,
  rowWithImageNumber,
  imageUrl,
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
        <Col xs={2} sm={2} md={2} id="wordListRowCol">
          <button
            className="btn btn-link btn-sm"
            onClick={() => getPhotoByWord(word.word, pageIndex)}
          >
            show
          </button>
        </Col>
      </Row>
      {imageUrl && pageIndex === rowWithImageNumber ? (
        <WordInfo imageUrl={imageUrl}/>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WordListRow;
