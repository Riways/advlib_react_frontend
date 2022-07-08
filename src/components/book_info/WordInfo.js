import React from "react";
import { Image, Row } from "react-bootstrap";

const WordInfo = ({imageUrl}) => {
    return (
        <Row className="d-flex align-items-center " id="wordInfoImageCard" >
         <img src={imageUrl} alt="img" id="wordImage"/>
        </Row>
    );
}

export default WordInfo