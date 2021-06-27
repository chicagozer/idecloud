import React, { Component } from "react";
import Headere from "./header";
import Editor from "./Editor";
import Output from "../CodeComponent/output";
import "antd/dist/antd.css";

import {
  Layout,
  Menu,
  Icon,
  Col,
  Row,
  Upload,
  message,
  Tooltip,
  Button
} from "antd";
import "../navbar.css";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const didLoad = () => {
  console.log("DidLoad");
};

const didMount = editor => {
  console.log("DidMount", editor);
};

const props = {
  name: "file",
  action: "//jsonplaceholder.typicode.com/posts/",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

export default class layout extends Component {
  state = {
    collapsed: false,
    Both: true,
    Editore: false,
    Preview: false,
    projectname: "",
    output: "",
    input: ""
  };
  input = value => {
    this.setState({
      input: value
    });
  };
  onclick = e => {
    e.preventDefault();
    this.setState({
      Both: true,
      Editore: false,
      Preview: false
    });
  };
  onclickE = e => {
    e.preventDefault();
    this.setState({
      Both: false,
      Editore: true,
      Preview: false
    });
  };
  onclickP = e => {
    e.preventDefault();
    this.setState({
      Both: false,
      Editore: false,
      Preview: true
    });
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  getprojectname = value => {
    this.setState({
      projectname: value
    });
  };
  output = value => {
    this.setState({
      output: value
    });
  };

  render() {
    return (
      <Layout style={{ height: "auto" }}>
        <Sider
          style={{ marginTop: "45px", minHeight: 597, height: "auto" }}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Headere projectname={this.getprojectname} />

          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              style={this.state.projectname !== "" ? {} : { display: "none" }}
              key="sub1"
              title={
                <span>
                  <Icon type="folder" />
                  <span>{this.state.projectname}</span>
                </span>
              }
            >
              <Upload {...props}>
                {" "}
                <Tooltip placement="topRight" title="upload file">
                  <Icon
                    type="upload"
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      marginLeft: "170px",
                      marginRight: "1px"
                    }}
                  />{" "}
                </Tooltip>
              </Upload>

              <Menu.Item key="3">
                <span>
                  <Icon type="file" />
                  <span>file1</span>
                </span>
              </Menu.Item>
              <Menu.Item key="4">
                <span>
                  <Icon type="file" />
                  <span>file2</span>
                </span>
              </Menu.Item>
              <Menu.Item key="5">
                <span>
                  <Icon type="file" />
                  <span>file3</span>
                </span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ color: "green" }} />
          <Content style={{ margin: "20px" }}>
            <Row>
              <Col span={24}>
              
              </Col>
            </Row>
          </Content>

          <Footer
            style={{
              background: "#001529",
              textAlign: "center",
              marginTop: "0px",
              color: "#fff",

              paddingTop: "0px"
            }}
          />
        </Layout>
      </Layout>
    );
  }
}
