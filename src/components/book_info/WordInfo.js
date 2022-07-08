import React from "react";
import { Col,  Row } from "react-bootstrap";

const WordInfo = ({ imageUrl, wordDefinition }) => {
  return (
    <Row className="d-flex align-items-center " id="wordInfoImageCard">
      <Col>
        <img src={imageUrl} alt="img" id="wordImage" />
      </Col>
      <Col>
        {wordDefinition}
      </Col>
    </Row>
  );
};

export default WordInfo;
