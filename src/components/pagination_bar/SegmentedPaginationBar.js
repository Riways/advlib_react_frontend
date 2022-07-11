import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NextPageButton from "./NextPageButton";
import NumButton from "./NumButton";
import PreviousPageButton from "./PreviousPageButton";

const SegmentedPaginationBar = ({
  changeShowedWords,
  currentPage,
  pagesSummary,
}) => {
  return (
    <Container className="mt-2 mb-5 d-flex justify-content-center ">
      <Col>
        <PreviousPageButton
          changeShowedWords={changeShowedWords}
          currentPage={currentPage}
        />
      </Col>
      <Row className="align-items-end justify-content-center   " md={10} s={10} xs={10}>
        {currentPage > 2 ? (
          <>
            <Col>
              <NumButton
                symbol={1}
                currentPage={currentPage}
                changeShowedWords={changeShowedWords}
              />
            </Col>
            {currentPage === 3 ? <></> : <Col>...</Col>}
          </>
        ) : (
          <></>
        )}

        {(currentPage < 2) | (currentPage > pagesSummary - 2) ? <></> : <></>}

        {currentPage === 1 ? (
          <></>
        ) : (
          <Col>
            <NumButton
              symbol={currentPage - 1}
              currentPage={currentPage}
              changeShowedWords={changeShowedWords}
            />
          </Col>
        )}

        <Col>
          <NumButton
            symbol={currentPage}
            currentPage={currentPage}
            changeShowedWords={changeShowedWords}
          />
        </Col>
        {currentPage === pagesSummary ? (
          <></>
        ) : (
          <Col>
            <NumButton
              symbol={currentPage + 1}
              currentPage={currentPage}
              changeShowedWords={changeShowedWords}
            />
          </Col>
        )}

        {currentPage < pagesSummary - 1 ? (
          <>
            {currentPage === pagesSummary - 2 ? <></> : <Col>...</Col>}
            <Col>
              <NumButton
                symbol={pagesSummary}
                currentPage={currentPage}
                changeShowedWords={changeShowedWords}
              />
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
      <Col>
        <NextPageButton
          pagesSummary={pagesSummary}
          changeShowedWords={changeShowedWords}
          currentPage={currentPage}
        />
      </Col>
    </Container>
  );
};

export default SegmentedPaginationBar;
