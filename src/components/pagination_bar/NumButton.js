import React from "react";
import { Button } from "react-bootstrap";

const NumButton = ({
  changeShowedWords,
  symbol,
  currentPage,
}) => {




  return (
    <div>
      {currentPage === symbol ? (
        <Button  id="numerationButton" variant="outline-secondary" disable active >
          {symbol}
        </Button>
      ) : (
        <Button id="numerationButton" variant="outline-secondary" onClick={() => changeShowedWords(symbol)} >{symbol}</Button>
      )}
    </div>
  );
};

export default NumButton;
