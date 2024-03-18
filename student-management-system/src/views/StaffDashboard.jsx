import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import state from "../store";
import { useSnapshot } from "valtio";
import ManageStudents from "../components/ManageStudents";
import StaffManagement from "../components/StaffManagement";
import StaffReports from "../components/StaffReports";
import StaffCourses from "../components/StaffCourses";
import StaffFeedbacks from "../components/StaffFeedbacks";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const StaffDashboard = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Assuming state.currentUser is set after successful login
    if (!state.currentUser || state.currentUser.role !== "staff") {
      navigate("/login");
    }
  }, [navigate]);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    state.currentUser = null;
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            onClick={() => {
              state.activeIndex = 0;
            }}
            key="1"
            icon={<UserOutlined />}
          >
            Manage Students
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 1;
            }}
            key="2"
            icon={<BookOutlined />}
          >
            Courses
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 2;
            }}
            key="3"
            icon={<FileTextOutlined />}
          >
            Reports
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 5;
            }}
            key="9"
            icon={<CommentOutlined />}
          >
            Feedbacks
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 3;
            }}
            key="5"
            icon={<UserOutlined />}
          >
            Staff Management
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          <Title style={{ color: "white", marginLeft: 20 }}>
            Staff Dashboard
          </Title>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {snap.activeIndex === 0 && <ManageStudents />}
            {snap.activeIndex === 1 && <StaffCourses />}
            {snap.activeIndex === 2 && <StaffReports />}
            {snap.activeIndex === 3 && <StaffManagement />}
            {snap.activeIndex === 5 && <StaffFeedbacks />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SLIIT @2024 Created by SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StaffDashboard;
