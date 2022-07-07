import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../../images/Nippon_Family_Book_logo.svg";

const SmallHeader = () => {
  return (
    <Container>
      <Row className="mt-3 mb-5 ">
        <Col className="d-flex align-items-center justify-content-center">
          <a href="/">
            <Logo style={{ width: 45 }} />
          </a>
          <h1 className="d-inline-block">AdvLib</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default SmallHeader;
