import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";

import MainOption from "../../components/mainOption/mainOption";

import "./main.css";

const Main = props => {
  let completed;
  return (
    <main className="main">
      <Container>
        <Row>
          <Col sm="12" className="main__content--center">
            <p className="main__heading">Select your goal</p>
          </Col>
          {/* OPTIONS */}
          {props.options.map(option => {
            if (option.id === 1) completed = props.progressStrength;
            else if (option.id === 2) completed = props.progressFlexiblity;
            else completed = 0;

            return (
              <Link to={option.link} key={option.id}>
                <MainOption
                  source={option.image}
                  title={option.title}
                  desc={option.desc}
                  duration={option.duration}
                  completed={completed}
                />
              </Link>
            );
          })}
        </Row>
      </Container>
    </main>
  );
};

export default Main;
