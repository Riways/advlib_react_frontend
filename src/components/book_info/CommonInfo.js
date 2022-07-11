import React from "react";
import { Col, Container, Row } from "react-bootstrap";


const CommonInfo = ({book, wordsConsistingEightyPercent}) => {

    return(<Container className="my-2">
        <Row id="commonBookInfoRow">
            <Col id="wordListHeaderRowCol" >Author</Col>
            <Col id="wordListRowCol" >{book.author.fullName}</Col>
        </Row>
        <Row id="commonBookInfoRow">
            <Col id="wordListHeaderRowCol" >Sentences</Col>
            <Col id="wordListRowCol" >{book.amountOfSentences}</Col>
        </Row>
        <Row id="commonBookInfoRow">
            <Col id="wordListHeaderRowCol" >Words summary</Col>
            <Col id="wordListRowCol" >{book.amountOfWords}</Col>
        </Row>
        <Row id="commonBookInfoRow">
            <Col id="wordListHeaderRowCol" >Readabilty</Col>
            <Col id="wordListRowCol" >{book.readability}</Col>
        </Row>
        <Row id="commonBookInfoRow">
            <Col id="wordListHeaderRowCol" >Words that compose 80% of the text</Col>
            <Col id="wordListRowCol" >{wordsConsistingEightyPercent}</Col>
        </Row>
    </Container>);
}

export default CommonInfo;