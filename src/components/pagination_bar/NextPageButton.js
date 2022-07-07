import React from "react";
import { Button } from "react-bootstrap";

const NextPageButton = ({ changeShowedWords, currentPage, pagesSummary }) => {
  const symbolNext = ">";
  return (
    <div>
      {currentPage === pagesSummary ? (
        <Button variant="outline-secondary" disable value="<">
          {symbolNext}
        </Button>
      ) : (
        <Button
          variant="outline-secondary"
          onClick={() => changeShowedWords(currentPage + 1)}
          value=">"
        >
          {symbolNext}
        </Button>
      )}
    </div>
  );
};

export default NextPageButton;
