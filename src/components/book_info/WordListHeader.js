import React from "react";
import { Col, Row } from "react-bootstrap";

const WordListHeader = () => {
  return (
    <Row id="wordListHeaderRow">
      <Col xs={2} sm={2} md={2} id="wordListHeaderRowCol">
        №
      </Col>
      <Col id="wordListHeaderRowCol">Word</Col>
      <Col id="wordListHeaderRowCol">Counter</Col>
      <Col xs={2} sm={2} md={2} id="wordListHeaderRowCol">Image</Col>
    </Row>
  );
};

export default WordListHeader;
