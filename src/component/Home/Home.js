import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import AboutLogin from "../About/AboutLogIn";
import DrPge from "../DrPge/DoctorPage";
import Footer from "../Footer/Footer";
/*import ButtonAppBar from "../Header/Home_Header";*/
import Code from "../code";
import Profile from "../profile";
import Admin from "../Admin/Admin";
class Home extends Component {
  state = {
    islogin: false,
    role: "".match,
    requestt: []
  };
  islogin = value => {
    this.setState({
      islogin: value,
      username: ""
    });
  };
  role = value => {
    this.setState({
      role: value
    });
  };
  request = value => {
    this.setState({
      requestt: value
    });
  };
  username = value => {
    this.setState({
      username: value
    });
  };

  render() {
    return (
      <div style={{}}>
        <div style={this.state.islogin ? { display: "none" } : {}}>
          <div style={{}}>
            <AppBar
              position="fixed"
              style={{ background: "#1c4545", textAlign: "left" }}
            >
              <Toolbar>
                <Typography variant="title" style={{ flex: 1, color: "#fff" }}>
                  IDE Cloud
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div
            style={{
              backgroundImage: "radial-gradient( #fff , #153c3f )",
              minHeight: 657
            }}
          >
            <div>
              <AboutLogin
                islogin={this.islogin}
                username={this.username}
                role={this.role}
                request={() => this.request}
              />
            </div>
          </div>
        </div>
        {this.state.islogin && this.state.role === "student" ? (
          <div>
            <Code islogin={this.islogin} username={this.state.username} />
          </div>
        ) : (
          <div />
        )}
        {this.state.islogin && this.state.role === "instructor" ? (
          <div>
            <DrPge islogin={this.islogin} username={this.state.username} />
          </div>
        ) : (
          <div />
        )}

        {this.state.islogin && this.state.role === "admin" ? (
          <Admin
            islogin={this.islogin}
            username={this.state.username}
            requestt={this.state.requestt}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Home;
