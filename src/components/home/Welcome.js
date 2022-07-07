import axios from "axios";
import React from "react";
import { Container } from "react-bootstrap";

const Welcome = ({ book, setError, setBooks }) => {
  return (
    <Container className=" d-inline-block px-3 py-2  " id="welcomeComponent">
      <p>
        AdvLib is an application used to analyze English-language text. It can
        be useful for users who are learning English and want to improve their
        reading skills.
      </p>
      <p>
        A registered user can upload files with a .txt extension and get
        information about that text. Application counts amount of sentences,
        words, letters and calculates readability grade for each uploaded book.
        Also it count the frequency of occurrence for each word found in the
        text.
      </p>
    </Container>
  );
};

export default Welcome;
