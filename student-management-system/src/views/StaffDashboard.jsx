import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  NotificationOutlined,
  LogoutOutlined,
  CommentOutlined,
  ProfileOutlined,
  GroupOutlined,
  ShopOutlined,
  HomeOutlined,
  PullRequestOutlined,
  RedditSquareFilled,
  RestFilled,
} from "@ant-design/icons";
import state from "../store";
import { useSnapshot } from "valtio";
import ManageStudents from "../components/ManageStudents";
import StaffManagement from "../components/StaffManagement";
import StaffReports from "../components/StaffReports";
import StaffCourses from "../components/StaffCourses";
import StaffFeedbacks from "../components/StaffFeedbacks";
import StaffNotifications from "../components/StaffNotifications";
import StudentProfile from "../components/StudentProfile";
import NonAcademicList from "../components/NonAcademicList";
import LeaveRequests from "../components/LeaveRequests";
import LeaveRequestAdmin from "../components/LeaveRequestAdmin";
import RequestHoll from "../components/RequestHoll";
import HallRequestApproves from "../components/HallRequestApproves";
import MaintananceRequests from "../components/MaintananceRequests";
import ResourceManager from "../components/ResourceManager";
import SupplimentManagement from "../components/SupplimentManagement";
import CanteenMenu from "../components/CanteenMenu";
import CanteenFeedbacks from "../components/CanteenFeedbacks";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const StaffDashboard = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!state.currentUser || state.currentUser.role === "student") {
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
          {snap.currentUser.role === "student_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 0;
              }}
              key="1"
              icon={<UserOutlined />}
            >
              Manage Students
            </Menu.Item>
          )}
          {snap.currentUser.role === "module_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 1;
              }}
              key="2"
              icon={<BookOutlined />}
            >
              Courses
            </Menu.Item>
          )}

          {snap.currentUser.role === "module_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 6;
              }}
              key="1113"
              icon={<NotificationOutlined />}
            >
              Announcements
            </Menu.Item>
          )}

          {snap.currentUser.role === "class_schedule_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 11;
              }}
              key="asasadsad"
              icon={<PullRequestOutlined />}
            >
              Hall Requests
            </Menu.Item>
          )}
          {snap.currentUser.role === "non_academic_staff" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 7;
              }}
              key="1111213"
              icon={<ProfileOutlined />}
            >
              Profile
            </Menu.Item>
          )}
          {(snap.currentUser?.role === "non_academic_staff" ||
            snap.currentUser?.role === "admin") && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 9;
              }}
              key="1111aaa213"
              icon={<HomeOutlined />}
            >
              Leave Requests
            </Menu.Item>
          )}
          {snap.currentUser.role === "non_academic_staff" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 8;
              }}
              key="111121aaaa3"
              icon={<GroupOutlined />}
            >
              Non Acedemic
            </Menu.Item>
          )}
          {(snap.currentUser?.role === "module_manager" ||
            snap.currentUser?.role === "teacher" ||
            snap.currentUser?.role === "student_manager") && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 5;
              }}
              key="9"
              icon={<CommentOutlined />}
            >
              Feedbacks
            </Menu.Item>
          )}
          {snap.currentUser?.role === "teacher" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 10;
              }}
              key="11"
              icon={<ShopOutlined />}
            >
              Request Hall
            </Menu.Item>
          )}
          {snap.currentUser?.role === "maintenance_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 13;
              }}
              key="121"
              icon={<ShopOutlined />}
            >
              Resources
            </Menu.Item>
          )}
          {snap.currentUser?.role === "canteen_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 14;
              }}
              key="aa121"
              icon={<ShopOutlined />}
            >
              Suppliments
            </Menu.Item>
          )}
          {snap.currentUser?.role === "canteen_manager" && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 17;
              }}
              key="aa1asas21"
              icon={<CommentOutlined />}
            >
              Feedbacks
            </Menu.Item>
          )}
          {(snap.currentUser?.role === "teacher" ||
            snap.currentUser?.role === "maintenance_manager") && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 12;
              }}
              key="12"
              icon={<RedditSquareFilled />}
            >
              Maintanance Requests
            </Menu.Item>
          )}
          {(snap.currentUser.role === "module_manager" ||
            snap.currentUser.role === "student_manager" ||
            snap.currentUser.role === "non_academic_staff") && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 2;
              }}
              key="3"
              icon={<FileTextOutlined />}
            >
              Reports
            </Menu.Item>
          )}
          {(snap.currentUser.role === "student_manager" ||
            snap.currentUser.role === "admin") && (
            <Menu.Item
              onClick={() => {
                state.activeIndex = 3;
              }}
              key="5"
              icon={<UserOutlined />}
            >
              Staff Management
            </Menu.Item>
          )}
          <Menu.Item
            key="121"
            icon={<RestFilled />}
            onClick={() => {
              state.activeIndex = 16;
            }}
          >
            Canteen Menu
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          <Title style={{ color: "white", marginLeft: 20, marginTop: 10 }}>
            <span style={{ fontStyle: "normal" }}>
              {snap.currentUser?.role
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>{" "}
            Dashboard
          </Title>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {snap.activeIndex === 0 && <ManageStudents />}
            {snap.activeIndex === 1 && <StaffCourses />}
            {snap.activeIndex === 2 && <StaffReports />}
            {snap.activeIndex === 3 && <StaffManagement />}
            {snap.activeIndex === 5 && <StaffFeedbacks />}
            {snap.activeIndex === 6 && <StaffNotifications />}
            {snap.activeIndex === 7 && <StudentProfile />}
            {snap.activeIndex === 8 && <NonAcademicList />}
            {snap.activeIndex === 9 && snap.currentUser?.role === "admin" && (
              <LeaveRequestAdmin />
            )}
            {snap.activeIndex === 9 &&
              snap.currentUser?.role === "non_academic_staff" && (
                <LeaveRequests />
              )}
            {snap.activeIndex === 10 && <RequestHoll />}
            {snap.activeIndex === 11 && <HallRequestApproves />}
            {snap.activeIndex === 12 && <MaintananceRequests />}
            {snap.activeIndex === 13 && <ResourceManager />}
            {snap.activeIndex === 14 && <SupplimentManagement />}
            {snap.activeIndex === 15 && <ResourceManager />}
            {snap.activeIndex === 16 && <CanteenMenu />}
            {snap.activeIndex === 17 && <CanteenFeedbacks />}
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
