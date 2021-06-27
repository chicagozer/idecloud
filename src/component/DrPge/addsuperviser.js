import React, { Component } from "react";

import Select from "@material-ui/core/Select";
import { Icon, Col, Row } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";

class Addsupervisor extends Component {
  state = {
    expanded: false,
    items: [],
    show: true,
    moderater: [],
    mname: [],
    Supervisor: "",
    super: "",
    addsuperviser: false,
    list: new Map()
  };

  handleChangeSupervisor = value => {
    this.setState({
      Supervisor: value
    });
    console.log(value);
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/rule/?search=instructor", {})
      .then(res => {
        this.setState({
          moderater: res.data
        });
        this.state.moderater.map(value =>
          axios
            .get("http://127.0.0.1:8000/user/?search=" + value.userid, {})
            .then(res => {
              let lists = this.state.mname;
              lists.push(
                res.data.map(v => v.first_name).toString() +
                  " " +
                  res.data.map(v => v.last_name).toString()
              );
              this.setState(prevState => ({
                list: prevState.list.set(
                  res.data.map(v => v.first_name).toString() +
                    " " +
                    res.data.map(v => v.last_name).toString(),
                  res.data.map(v => v.username).toString()
                )
              }));
              this.setState({
                mname: lists
              });
              console.log(this.state.mname.map(val => val));
            })
            .catch(err => {
              console.log(err.message);
            })
        );
        axios
          .get(
            "http://127.0.0.1:8000/instructorstudent/?search=" + this.props.id,
            {}
          )
          .then(res => {
            this.setState({
              items: res.data
            });
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  cancel = () => {
    this.setState({
      show: false
    });
    this.props.hide();
  };
  addsupervisor = () => {
    if (this.state.Supervisor !== "") {
      axios
        .post("http://127.0.0.1:8000/supervisor/", {
          instructor: this.props.id,
          spervisorname: this.state.list.get(this.state.Supervisor),
          name: this.state.Supervisor
        })
        .then(res => {
          axios
            .get("http://127.0.0.1:8000/supervisor/" + res.data.id, {})
            .then(res => {
              this.props.superrequest(res.data.name.toString());
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => {
          console.log(err.message);
        });

      this.props.hide();
    }
  };

  render() {
    return (
      <div>
        {this.state.show ? (
          <div>
            <form
              error="true"
              style={{
                color: "#001529",

                padding: 24,

                minHeight: 350,
                height: "auto",
                textAlign: "left"
              }}
            >
              <p style={{ textAlign: "left", color: "#305656", fontSize: 20 }}>
                Add Assistant to {this.props.coursename} course
              </p>
              <Row>
                <Col span={9}>
                  {" "}
                  <div>
                    <InputLabel style={{ color: "#305656", margin: 10 }}>
                      Assistant
                    </InputLabel>
                    <Select
                      style={{ textAlign: "center", width: 200 }}
                      lable="Assistant"
                      required
                      native
                      value={this.state.Supervisor}
                      onChange={event =>
                        this.handleChangeSupervisor(event.target.value)
                      }
                    >
                      <option value="" />
                      {this.state.mname.map(val => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col span={15}>
                  <Button
                    color="primary"
                    onClick={this.addsupervisor}
                    size="large"
                    style={{
                      background: "#fff",
                      color: "#305656",
                   
                      postion: "relative",
                      float: "left",
                      padding: 5,
                      border: "1px solid #305656",
                      borderRadius: "5px"
                    }}
                  >
                    Add
                    <AddIcon />
                  </Button>
                </Col>
              </Row>

              <Row />
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Addsupervisor;
