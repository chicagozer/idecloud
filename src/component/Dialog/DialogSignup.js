import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialogSignup extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="inherit"
          onClick={this.handleClickOpen}
        >
          create an account
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Signup</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Register to be able using this system
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
            />

            <TextField
              margin="dense"
              id="number"
              label="Registeration number"
              fullWidth
            />

            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
