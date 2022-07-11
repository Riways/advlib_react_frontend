import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as LinkedInLogo } from "../../images/logo.svg";
import { ReactComponent as EmailLogo } from "../../images/email.svg";
import { ReactComponent as GithubLogo } from "../../images/github.svg";

const Footer = () => {
  return (
    <Container id="footer" className="d-flex fixed-bottom align-items-center">
      <Row className=" w-100  p-3 ">
        <Col md={3} sm={3} xs={3}  >
          <h5 className="m-2">2022 AdvLib</h5>
        </Col>

        <Col
          md={{ span: 3, offset: 6 }}
          sm={{ span: 3, offset: 6 }}
          xs={{ span: 3, offset: 6 }}
          className="d-flex  justify-content-end align-items-center"
        >
          <a href="https://www.linkedin.com/in/viktar-baradzin-512672206/">
            <LinkedInLogo width={45} height={45}/>
          </a>
          <a href="mailto:a0fragile@gmail.com" className="ms-2">
            <EmailLogo width={40} height={40} />
          </a>
          <a href="https://github.com/Riways"  className="ms-4">
            <GithubLogo width={30} height={30} />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
