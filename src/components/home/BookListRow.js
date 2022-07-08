import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookListRow = ({ index, book, removeBookById }) => {
  let role;
  const isLogged = localStorage.getItem("isLoggedIn");
  if (isLogged) {
    role = localStorage.getItem("role");
  }

  return (
    <Row id="bookListRow">
      <Col xs={1} sm={1} md={1} id="bookListRowCol">
        {index + 1}
      </Col>
      <Col id="bookListRowCol">{book.bookName}</Col>
      <Col id="bookListRowCol">{book.author.fullName}</Col>
      {isLogged ? (
        <Col xs={2} sm={2} md={2} id="bookListRowCol">
          <Link to={`/book-info?bookId=${book.id}&bookName=${book.bookName}`}>
            Analyze
          </Link>
        </Col>
      ) : (
        <Col xs={2} sm={2} md={2} id="bookListRowCol">
          Please log in
        </Col>
      )}
      {role === "ROLE_ADMIN" ? (
        <Col xs={2} sm={2} md={2} id="bookListRowCol">
          <input
                type="submit"
                value="Delete"
                className=" btn btn-secondary  btn-sm"
                onClick={() => removeBookById(book.id)}
                />
        </Col>
      ) : (
        <Col xs={2} sm={2} md={2} id="bookListRowCol">
          {book.readability}
        </Col>
      )}
      
    </Row>
  );
};

export default BookListRow;
