import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as LinkedInLogo } from "../../images/logo.svg";
import { ReactComponent as EmailLogo } from "../../images/email.svg";
import { ReactComponent as GithubLogo } from "../../images/github.svg";

const Footer = () => {
  return (
    <Container   id="footer" className=" d-flex mt-5 fixed-bottom align-items-center">
        <Col md={3} sm={3} xs={3}  className="d-flex  justify-content-start align-items-center">
          <h6 className="my-2" >2022 AdvLib</h6>
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
          <a href="mailto:a0fragile@gmail.com" className="ms-1">
            <EmailLogo width={35} height={35} />
          </a>
          <a href="https://github.com/Riways"  className="ms-3">
            <GithubLogo width={28} height={28} />
          </a>
        </Col>
    </Container>
  );
};

export default Footer;
