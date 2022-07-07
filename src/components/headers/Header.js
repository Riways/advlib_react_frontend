import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as Logo } from "../../images/Nippon_Family_Book_logo.svg";
import { ReactComponent as Person } from "../../images/person.svg";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  let user = null;
  const isLogged = localStorage.getItem("isLoggedIn");
  if (isLogged) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <Container id="navBar">
      <Row className=" d-flex  py-2">
        <Col md={3} sm={3} xs={3} className="d-inline-flex  align-items-center">
          <a href="/">
            <Logo style={{ width: 45 }} />
          </a>
          <h1 className="d-inline-block">AdvLib</h1>
        </Col>
        {isLogged ? (
          <Col
            md={{ span: 4, offset: 5 }}
            sm={{ span: 4, offset: 5 }}
            xs={{ span: 4, offset: 5 }}
            className=" d-inline-flex align-items-center justify-content-end"
          >
            <Person style={{ width: 40 }} />
            <span>{user.username}</span>
            <DropdownMenu />
          </Col>
        ) : (
          <Col
            md={{ span: 3, offset: 6 }}
            sm={{ span: 3, offset: 6 }}
            xs={{ span: 3, offset: 6 }}
            className=" d-flex align-items-center justify-content-center"
          >
            <a href="/login">
              <h5>Log In</h5>
            </a>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Header;
