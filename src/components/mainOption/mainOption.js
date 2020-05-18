import React from "react";
import {
  Col,
  Card,
  CardImgOverlay,
  CardTitle,
  CardImg,
  CardText,
  Progress
} from "reactstrap";

import "./mainOption.css";

const MainOption = props => {
  let progressColor;
  if (props.completed <= 10) progressColor = "danger";
  else if (props.completed > 10 && props.completed <= 30)
    progressColor = "warning";
  else if (props.completed > 30 && props.completed <= 70)
    progressColor = "info";
  else if (props.completed > 70 && props.completed <= 100)
    progressColor = "primary";
  else if (props.completed === 100) progressColor = "success";

  return (
    <Col
      sm="12"
      lg="4"
      md="6"
      className="offset-lg-4 mb-4 main__content-options"
    >
      <Card className="bg-dark text-white option__card">
        <CardImg
          src={props.source}
          alt="option image"
          className="option__card-image"
        />
        <CardImgOverlay>
          <CardTitle className="option__card-heading">{props.title}</CardTitle>
          <CardText className="option__card-desc">{props.desc}</CardText>
          <CardText className="option__card-duration">
            Duration: {props.duration} days
          </CardText>
          <Progress
            animated
            color={progressColor}
            value={Math.ceil(props.completed)}
            className="progressBar"
          >
            {Math.ceil(props.completed)}%
          </Progress>
        </CardImgOverlay>
      </Card>
    </Col>
  );
};

export default MainOption;
