import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import BookListHeader from "./BookListHeader";
import BookListRow from "./BookListRow";

const BookList =   ({ books,  removeBookById}) => {
  return (
    <Container >
      <BookListHeader />
      {books.map((book, index) => (
        <BookListRow key={index} index={index} book={book} removeBookById={removeBookById} />
      ))}
      <Footer/>
    </Container>
  );
};

export default BookList;
