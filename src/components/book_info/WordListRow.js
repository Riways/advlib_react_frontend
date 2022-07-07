import React from "react";
import { Col, Row } from "react-bootstrap";

const WordListRow = ({ index, word, currentPage, wordsOnPage }) => {
  const pageIndex = wordsOnPage * (currentPage - 1) + index + 1;
  return (
    <Row id="wordListRow">
      <Col xs={1} sm={1} md={1} id="wordListRowCol">
        {pageIndex}
      </Col>
      <Col id="wordListRowCol">{word.word}</Col>
      <Col id="wordListRowCol">{word.counter}</Col>
    </Row>
  );
};

export default WordListRow;
