import React, { Component } from "react";

import Header from "../header/header";
import Main from "../main/main";

class Home extends Component {
  render() {
    let options = this.props.options
      ? this.props.options
      : {
          id: 0,
          image: null,
          title: "strenxible",
          desc: "improve overall body fitness",
          duration: "some",
          link: "/"
        };
    let strengthProgress = this.props.progressStrength
      ? this.props.progressStrength
      : 0;
    let flexibilityProgress = this.props.progressFlexiblity
      ? this.props.progressFlexiblity
      : 0;

    return (
      <React.Fragment>
        <Header />
        <Main
          options={options}
          progressStrength={strengthProgress}
          progressFlexiblity={flexibilityProgress}
        />
      </React.Fragment>
    );
  }
}

export default Home;
