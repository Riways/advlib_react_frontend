import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NextPageButton from "./NextPageButton";
import NumButton from "./NumButton";
import PreviousPageButton from "./PreviousPageButton";

const PaginationBar = ({ changeShowedWords, currentPage, pagesSummary }) => {
  const numButtonsArrayGenerator = () => {
    let arr = [];
    for (let i = 1; i <= pagesSummary; i++) {
      arr.push(i);
    }
    return arr;
  };
  const arr = numButtonsArrayGenerator();

  return (
    <Container className="mt-2 mb-5 d-flex justify-content-center">
      <Row>
        <Col>
          <PreviousPageButton
            changeShowedWords={changeShowedWords}
            currentPage={currentPage}
          />
        </Col>
        {arr.map((i) => (
          <Col key={i}>
            <NumButton
              symbol={i}
              currentPage={currentPage}
              changeShowedWords={changeShowedWords}
            />
          </Col>
        ))}
        <Col>
          <NextPageButton
            pagesSummary={pagesSummary}
            changeShowedWords={changeShowedWords}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PaginationBar;
