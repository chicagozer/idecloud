import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddChallange from "./AddChallenge";
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: theme.palette.background.paper
  }
});

class CheckboxList extends React.Component {
  state = {
    checked: [0],
    items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    show: true,
    showForm: false
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  cancel = () => {
    this.setState({
      show: false
    });
  };
  HandleDelete = id => {
    console.log(id);
    let items = this.state.items;
    let i = items.findIndex(item => items.id === id);
    items.splice(i, 1);
    this.setState({ items });
  };

  addQuestion = () => {
    this.setState({
      showForm: !this.state.showForm,
      show: !this.state.show
    });
  };
  viewQ = () => {};
  render() {
    const { classes } = this.props;

    return (
      <div>
        <List
          className={classes.root}
          style={this.state.show ? {} : { display: "none" }}
        >
          {this.state.items.map(value => (
            <ListItem
              key={value.id}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value.id)}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value.id}`} />
              <ListItemSecondaryAction>
                <Button onClick={this.viewQ}>view question</Button>
                <IconButton
                  aria-label="delete"
                  onClick={() => this.HandleDelete(value.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {this.state.showForm ? <AddChallange /> : null}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);
