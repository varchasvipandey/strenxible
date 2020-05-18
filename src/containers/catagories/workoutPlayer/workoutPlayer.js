import React from "react";
import { Col, Button } from "reactstrap";

const Workout = props => {
  let duration = props.duration;
  return (
    <Col
      sm="12"
      lg="6"
      md="6"
      className="offset-lg-3  offset-md-3 video-container"
    >
      <video className="video__frame" width="100%" autoPlay loop>
        <source src={props.exercise}></source>
        Your browser does not support the video
      </video>
      <div className="video__description-box">
        <p className="video__title">{props.title}</p>
        <p className="video__desc">
          {props.desc} Do as many reps as you can in the time specified.
        </p>
      </div>
      <Button
        className="video__button"
        onClick={() => props.countdownHandler(duration)}
      >
        Start
      </Button>
    </Col>
  );
};

export default Workout;
