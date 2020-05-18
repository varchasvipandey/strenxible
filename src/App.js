import React, { Component } from "react";
import { Route } from "react-router-dom";
import toastr from "toastr";

import "./App.css";

// IMAGES
import strengthImage from "./img/option-strength.jpg";
import flexibleImage from "./img/option-flexible.jpg";

//containers
import Home from "./containers/home/home";
import Strength from "./containers/catagories/strength";
import Flexibility from "./containers/catagories/flexibility";

//components

class App extends Component {
  state = {
    options: [
      {
        id: 1,
        image: strengthImage,
        title: "build strength",
        desc:
          "complete focus on strength and muscle building. no equipments required.",
        duration: 30,
        link: "/strength"
      },
      {
        id: 2,
        image: flexibleImage,
        title: "build flexibility",
        desc:
          "improves posture and overall body flexibility. no equipments required.",
        duration: 45,
        link: "/flexibility"
      }
    ],
    strength: 0,
    flexiblity: 0
  };

  componentDidMount() {
    if (!localStorage.getItem("strenxible-strength")) {
      localStorage.setItem("strenxible-strength", 0);
      localStorage.setItem("strenxible-flexiblity", 0);
      console.log("Welcome new user");
      this.setState({
        strength: 0,
        flexiblity: 0
      });
      toastr.options = {
        positionClass: "toast-top-full-width",
        fadeIn: 300,
        fadeOut: 1000,
        hideDuration: 300,
        timeOut: 2000
      };
      toastr.clear();
      setTimeout(() => toastr.success("Welcome to the world of fitness!"), 300);
    } else {
      console.log("Old user");
      this.setState({
        strength: localStorage.getItem("strenxible-strength"),
        flexiblity: localStorage.getItem("strenxible-flexiblity")
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
        () => toastr.success("Let's continue your fitness journey"),
        300
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* HOME */}
        <Route exact path="/">
          <Home
            options={this.state.options}
            progressStrength={this.state.strength}
            progressFlexiblity={this.state.flexiblity}
          />
        </Route>
        {/* STRENGTH */}
        <Route path="/strength">
          <Strength progress={this.state.strength} />
        </Route>
        {/* FLEXIBILITY */}
        <Route path="/flexibility">
          <Flexibility progress={this.state.flexiblity} />
        </Route>
        {/* FOOTER */}
      </React.Fragment>
    );
  }
}

export default App;
