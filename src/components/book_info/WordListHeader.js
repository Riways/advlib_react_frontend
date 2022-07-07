import React from "react";
import { Col, Row } from "react-bootstrap";

const WordListHeader = () => {
  return (
    <Row id="wordListHeaderRow">
      <Col xs={1} sm={1} md={1} id="wordListHeaderRowCol">
        №
      </Col>
      <Col id="wordListHeaderRowCol">Word</Col>
      <Col id="wordListHeaderRowCol">Counter</Col>
    </Row>
  );
};

export default WordListHeader;
