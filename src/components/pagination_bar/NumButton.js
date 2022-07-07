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
        <Button variant="outline-secondary" disable active >
          {symbol}
        </Button>
      ) : (
        <Button variant="outline-secondary" onClick={() => changeShowedWords(symbol)} >{symbol}</Button>
      )}
    </div>
  );
};

export default NumButton;
