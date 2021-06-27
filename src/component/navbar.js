import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import React, { Component } from "react";

import "./navbar.css";
import "antd/dist/antd.css";
import axios from "axios";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    marginLeft: 0
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
class navbar extends Component {
  state = {
    anchorEl: null,
    code: false,
    assignment: true,
    anchorE2: null,
    course: []
  };
  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8000/studentincourse/?search=" + this.props.username,
        {}
      )
      .then(res => {
        this.setState({
          course: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  handleClick1 = event => {
    this.setState({ anchorE2: event.currentTarget });
  };

  handleClose1 = () => {
    this.setState({ anchorE2: null });
  };

  code = () => {
    this.setState({
      code: true,
      assignment: false
    });
    this.props.code(true, false);
  };
  assignment = () => {
    this.setState({
      code: false,
      assignment: true
    });
    this.props.code(false, true);
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handle_logout = username => {
    this.handleClose();
    Headers = { Authorization: localStorage.getItem("token") };
    axios
      .post("http://127.0.0.1:8000/rest-auth/logout/", Headers, {
        content: username
      })
      .then(res => {
        localStorage.removeItem("token");
        this.props.islogin(false);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, anchorE2 } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "#1c4545" }}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              style={{ textAlign: "left" }}
            >
              Cloud IDE
            </Typography>

            <div>
              <Button style={{ color: "#fff" }} onClick={this.assignment}>
                My courses
              </Button>

              <Button style={{ color: "#fff" }} onClick={this.code}>
                Practise
              </Button>

              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {this.props.username}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={e => this.handle_logout(this.props.username)}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(navbar);
