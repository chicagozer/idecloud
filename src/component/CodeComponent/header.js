import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../navbar.css";
import CollectionsPage from "./newprojectform";
import { Menu, Dropdown, Icon, Upload, message, Modal, Button } from "antd";
const SubMenu = Menu.SubMenu;
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

export default class header extends Component {
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };
  render() {
    return (
      <div>
        <Nav className="mr-auto">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <CollectionsPage projectname={this.props.projectname} />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                  <a>
                    <Icon type="file-add" theme="twoTone" /> new file
                  </a>
                </Menu.Item>
                <Menu.Divider />
                <SubMenu
                  title={
                    <span>
                      <Icon type="folder-open" theme="twoTone" />
                      open project
                    </span>
                  }
                >
                  <Menu.Item>
                    <Icon type="user" />
                    from profile
                  </Menu.Item>
                  <Menu.Item>
                    <Upload {...props}>
                      <Icon type="upload" />
                      from pc
                    </Upload>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            }
            trigger={["click"]}
            className="file"
          >
            <a className="ant-dropdown-link" style={{ color: "#fff" }}>
              File <Icon type="down" />
            </a>
          </Dropdown>
        </Nav>
      </div>
    );
  }
}
