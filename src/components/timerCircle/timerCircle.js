import React from "react";
import { Row, Col } from "reactstrap";

import "./timerCircle.css";

const Timer = props => {
  return (
    <Row>
      <Col sm="12" className="section__timer">
        <div className="timer-circle">
          <p className="timer-value">
            {props.children}
            <span> S</span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Timer;
