import React from "react";
import { Col, Row } from "react-bootstrap";

const BookListHeader = () => {
  let role;
  const isLogged = localStorage.getItem("isLoggedIn");
  if (isLogged) {
    role = localStorage.getItem("role");
  }

  return (
    <Row id="bookListHeaderRow">
      <Col xs={1} sm={1} md={1} id="bookListHeaderRowCol">
        №
      </Col>
      <Col id="bookListHeaderRowCol">Book name</Col>
      <Col id="bookListHeaderRowCol">Author</Col>
      <Col xs={2} sm={2} md={2} id="bookListHeaderRowCol">
        Info
      </Col>

      {role === "ROLE_ADMIN" ? (
        <Col xs={1} sm={1} md={1}>
          Delete
        </Col>
      ) : (
        <Col xs={1} sm={1} md={1} id="bookListRowCol">
          Grade
        </Col>
      )}
    </Row>
  );
};

export default BookListHeader;
