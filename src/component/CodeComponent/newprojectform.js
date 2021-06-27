import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
export default class newprojectform extends React.Component {
  state = {
    open: false,
    languege: "",
    name: "",
    opencv: "",
    Pthread: "",
    library: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handle_newproject = (e, name, language, library) => {
    this.handleClose();
    this.props.projectname(name);
    axios
      .post("http://127.0.0.1:8000/project/", {
        name: name,
        language: language,
        library: library,
        user: "1"
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  handleChangelibrary = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
    if (this.state.opencv) {
      this.setState({
        library: "opencv"
      });
    }
    if (this.state.pthread) {
      this.setState({
        library: "pthread"
      });
    }
  };
  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          New project
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth="true"
          error="true"
        >
          <DialogTitle id="form-dialog-title" style={{ color: "#001529" }}>
            New project
          </DialogTitle>
          <DialogContent>
            <TextField
              required="true"
              margin="dense"
              id="name"
              label="project name"
              type="text"
              onChange={this.handleChange("name")}
            />
            <div />
            <InputLabel>Languege</InputLabel>

            <Select
              required="true"
              margin="dense"
              style={{ margin: 10 }}
              native
              value={this.state.languege}
              onChange={this.handleChange("languege")}
            >
              <option value="" />
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </Select>
            <div />
            <InputLabel>library</InputLabel>
            <div />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value="true"
                  onChange={this.handleChangelibrary("opencv")}
                />
              }
              label="opencv"
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value="true"
                  onChange={this.handleChangelibrary("Pthread")}
                />
              }
              label="Pthread"
            />
            <div />
          </DialogContent>
          <DialogActions>
            <hr />
            <Button
              onClick={this.handleClose}
              style={{ background: "#001529", color: "#fff" }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={e =>
                this.handle_newproject(
                  e,
                  this.state.name,
                  this.state.languege,
                  this.state.library
                )
              }
              style={{ background: "#001529", color: "#fff" }}
              variant="outlined"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
