import React from "react";
import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import "./navigation.css";

import logo from "../../img/logo-text.png";

const Navigation = () => {
  return (
    <nav className="nav">
      <Container fluid>
        <Row>
          <Col sm="12" lg="6" className="offset-lg-3">
            <div className="nav__items">
              <div className="nav__item nav__item--logo">
                <img
                  src={logo}
                  alt="strenxible logo"
                  className="nav__logo"
                ></img>
              </div>
              <Link to="/" className="link-container">
                <div className="nav__item nav__item--link">
                  <ion-icon name="arrow-back-circle" size="large"></ion-icon>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default Navigation;
