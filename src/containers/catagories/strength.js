import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import toastr from "toastr";

import "./catagories.css";

//components
import Navigation from "../../components/navigation/navigation";
import Timer from "../../components/timerCircle/timerCircle";
import WorkoutPlayer from "./workoutPlayer/workoutPlayer";

//videos
import pushup from "../../videos/strength/push-up.mp4";
import punches from "../../videos/strength/punches.mp4";
import jumpropes from "../../videos/strength/jump-ropes.mp4";
import reachandsquat from "../../videos/strength/reach-and-squat.mp4";
import runninman from "../../videos/strength/runnin-man.mp4";

//Sounds
import whistle from "../../audio/start-stop.ogg";

class Strength extends React.Component {
  _timer = null;
  state = {
    counter: 0,
    running: false,
    day: 1,
    workout: 0,
    progress: 0,
    audioPlay: false,
    audioPause: true
  };

  // AUDIO
  audio = new Audio(whistle);

  play() {
    this.setState({ audioPlay: true, audioPause: false }, () => {
      this.audio.play();
    });
  }

  countdownHandler = counter => {
    clearInterval(this._timer);
    this.setState({ counter: counter });
    this.play();
    this._timer = setInterval(() => {
      this.setState({ running: true });
      if (this.state.counter > 0)
        this.setState({ counter: this.state.counter - 1 });
      else this.setState({ running: false });
    }, 1000);
    this.setState({ workout: this.state.workout + 1 }, () => {
      this.checkDayUpdate();
    });
  };

  checkDayUpdate = () => {
    console.log("Checking for update");
    if (this.state.workout === 5 && this.state.day < 30) {
      localStorage.setItem(
        "strenxible-strength-day",
        parseInt(this.state.day) + 1
      );
      let updateProgress =
        parseInt(localStorage.getItem("strenxible-strength")) + 3.33;
      localStorage.setItem("strenxible-strength", updateProgress);
      this.setState({ progress: updateProgress, workout: 0 });
      this.setState({
        day: localStorage.getItem("strenxible-strength-day")
      });
      toastr.options = {
        positionClass: "toast-top-full-width",
        fadeIn: 300,
        fadeOut: 1000,
        hideDuration: 300,
        timeOut: 2000
      };
      toastr.clear();
      setTimeout(() => toastr.success("Last exercise! Push it!"), 300);
    }
  };

  clearProgress = () => {
    localStorage.setItem("strenxible-strength-day", 1);
    localStorage.setItem("strenxible-strength", 0);
    this.setState({ day: localStorage.getItem("strenxible-strength-day") });
  };

  componentDidMount() {
    this.setState({ updated: false });
    if (!localStorage.getItem("strenxible-strength-day")) {
      localStorage.setItem("strenxible-strength-day", 1);
      this.setState({ day: 1 });
      toastr.options = {
        positionClass: "toast-top-full-width",
        fadeIn: 300,
        fadeOut: 1000,
        hideDuration: 300,
        timeOut: 2000
      };
      toastr.clear();
      setTimeout(
        () => toastr.success("Let's start building your strength"),
        300
      );
    } else {
      console.log("Old user");
      this.setState({
        day: localStorage.getItem("strenxible-strength-day"),
        progress: localStorage.getItem("strenxible-strength")
      });
      toastr.options = {
        positionClass: "toast-top-full-width",
        fadeIn: 300,
        fadeOut: 1000,
        hideDuration: 300,
        timeOut: 2000
      };
      toastr.clear();
      setTimeout(
        () => toastr.success("Let's continue building your strength"),
        300
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <section className="section section--strength">
          <Container fluid>
            <Row>
              <Col sm="12" className="section__heading">
                <h1 className="heading">Strength</h1>
                <p className="completed">
                  Day: <span>{this.state.day}/30</span>
                </p>
              </Col>
            </Row>
            <Timer>{this.state.counter}</Timer>
            {/* WORKOUTS */}
            <Row className="exercises">
              <WorkoutPlayer
                title="Push ups"
                desc="Start by keeping your hands parallel to your shoulder. Then go down while inhaling and then push yourself up while exhaling."
                exercise={pushup}
                duration="5"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Punches"
                desc="Perform air punches as hard as you can. This will improve your shoulder strength and control. Focus on an imaginary traget."
                exercise={punches}
                duration="90"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Jump Rope"
                desc="Perform skipping without ropes. Swing your hands in a motion similar to skipping while jumping off the ground."
                exercise={jumpropes}
                duration="90"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Reach Squat"
                desc="Stretch your hands as high as you can and then bring them down while performing a full squat."
                exercise={reachandsquat}
                duration="60"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Running Man"
                desc="Perform this cool down exercise at the very end. Do a soft running motion to release tension created inside your body during the workout."
                exercise={runninman}
                duration="90"
                countdownHandler={this.countdownHandler}
              />
            </Row>
            <Row className="controls">
              <Col sm="12" className="control-container">
                <Button
                  color="danger"
                  className="control__button"
                  onClick={() => this.clearProgress()}
                >
                  Clear Progress
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Strength;
