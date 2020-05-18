import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import toastr from "toastr";

import "./catagories.css";

//components
import Navigation from "../../components/navigation/navigation";
import Timer from "../../components/timerCircle/timerCircle";
import WorkoutPlayer from "./workoutPlayer/workoutPlayer";

//videos
import cowpose from "../../videos/flexibility/cow-pose.mp4";
import catcowpose from "../../videos/flexibility/cat-cow-pose.mp4";
import absstretch from "../../videos/flexibility/abs-stretch.mp4";
import flutterkicks from "../../videos/flexibility/flutter-kicks.mp4";
import spotrunning from "../../videos/flexibility/spot-running.mp4";

//Sounds
import whistle from "../../audio/start-stop.ogg";

class Flexibility extends React.Component {
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
    if (this.state.workout === 5 && this.state.day < 45) {
      localStorage.setItem(
        "strenxible-flexiblity-day",
        parseInt(this.state.day) + 1
      );
      let updateProgress =
        parseInt(localStorage.getItem("strenxible-flexiblity")) + 2.22;
      localStorage.setItem("strenxible-flexiblity", updateProgress);
      this.setState({ progress: updateProgress, workout: 0 });
      this.setState({
        day: localStorage.getItem("strenxible-flexiblity-day")
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
    localStorage.setItem("strenxible-flexiblity-day", 1);
    localStorage.setItem("strenxible-flexiblity", 0);
    this.setState({ day: localStorage.getItem("strenxible-flexiblity-day") });
  };

  componentDidMount() {
    this.setState({ updated: false });
    if (!localStorage.getItem("strenxible-flexiblity-day")) {
      localStorage.setItem("strenxible-flexiblity-day", 1);
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
        () => toastr.success("Let's start building your flexibility"),
        300
      );
    } else {
      console.log("Old user");
      this.setState({
        day: localStorage.getItem("strenxible-flexiblity-day"),
        progress: localStorage.getItem("strenxible-flexiblity")
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
        () => toastr.success("Let's continue building your flexibility"),
        300
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <section className="section section--flexiblity">
          <Container fluid>
            <Row>
              <Col sm="12" className="section__heading">
                <h1 className="heading">Flexibility</h1>
                <p className="completed">
                  Day: <span>{this.state.day}/45</span>
                </p>
              </Col>
            </Row>
            <Timer>{this.state.counter}</Timer>
            {/* WORKOUTS */}
            <Row className="exercises">
              <WorkoutPlayer
                title="Cow pose"
                desc="Sit in a position shown in the video and then move your body back and forth. This motion will cause stretch in your hip muscles."
                exercise={cowpose}
                duration="5"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Cat Cow Pose"
                desc="Extend previous stretch by changing the motion. This stretch works on your spine flexibility. Create some tension in the spine, but not too much."
                exercise={catcowpose}
                duration="90"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Abs Stretch"
                desc="Put your one left on top of other as shown in the video and perform a single crunch. Switch the legs and perform another crunch."
                exercise={absstretch}
                duration="90"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Flutter kicks"
                desc="Alternatively perform a to and fro lifting motion with your legs. Don't let the leg other than the lifted leg touch the ground."
                exercise={flutterkicks}
                duration="60"
                countdownHandler={this.countdownHandler}
              />
              <WorkoutPlayer
                title="Spot running"
                desc="Perform this cool down exercise at the very end. Bring your knees as high as possible to stretch your lower body muscles"
                exercise={spotrunning}
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

export default Flexibility;
