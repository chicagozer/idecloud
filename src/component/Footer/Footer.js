import React, { Component } from "react";

import Favorite from "@material-ui/icons/Favorite";

import { pink } from "@material-ui/core/colors";

class Footer extends Component {
  render() {
    return (
      <p style={{ fontSize: 15, hieght: "30px" }}>
        made by Lama Dwikat and Shurooq Ghaith for a better learning{" "}
        <Favorite color="secondary" />
      </p>
    );
  }
}

export default Footer;
