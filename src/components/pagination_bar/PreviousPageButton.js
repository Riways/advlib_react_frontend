import React from "react";
import { Button } from "react-bootstrap";

const PreviousPageButton = ({ changeShowedWords, currentPage }) => {
  const symbolPrevious = "<";
  return (
    <div>
      {currentPage === 1 ? (
        <Button variant="outline-secondary" disable >
          {symbolPrevious}
        </Button>
      ) : (
        <Button
          variant="outline-secondary"
          onClick={() => changeShowedWords(currentPage - 1)}
        >
          {symbolPrevious}
        </Button>
      )}
    </div>
  );
};

export default PreviousPageButton;
