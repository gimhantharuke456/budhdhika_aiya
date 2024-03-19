import React from "react";
import { Layout, Menu } from "antd";
import {
  BookOutlined,
  CreditCardOutlined,
  HomeOutlined,
  UserOutlined,
  HeatMapOutlined,
  ShakeOutlined,
  FundOutlined,
} from "@ant-design/icons";
import state from "../store";
import { useSnapshot } from "valtio";
import StudentHome from "../components/StudentHome";
import { useNavigate } from "react-router-dom";
import StudentCourses from "../components/StudentCourses";
import StudentPayments from "../components/StudentPayments";
import StudentProfile from "../components/StudentProfile";
import StudentMarkings from "../components/StudentMarkings";
import HallArrangements from "../components/HallArrangements";
import CanteenMenu from "../components/CanteenMenu";

const { Header, Content } = Layout;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const handleClick = (index) => {
    state.activeIndex = index;
  };

  const snap = useSnapshot(state);

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[`${snap.activeIndex}`]}
        >
          <Menu.Item
            onClick={(e) => {
              handleClick(0);
            }}
            key="0"
            icon={<HomeOutlined />}
          >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(1);
            }}
            key="1"
            icon={<BookOutlined />}
          >
            Courses
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(2);
            }}
            key="2"
            icon={<CreditCardOutlined />}
          >
            Payments
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(3);
            }}
            key="3"
            icon={<UserOutlined />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(5);
            }}
            key="7"
            icon={<ShakeOutlined />}
          >
            Markings
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(8);
            }}
            key="8"
            icon={<HeatMapOutlined />}
          >
            Hall Arrangments
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              handleClick(10);
            }}
            key="12"
            icon={<FundOutlined />}
          >
            Canteen Menu
          </Menu.Item>
          <Menu.Item
            onClick={(e) => {
              localStorage.removeItem("email");
              state.currentUser = null;
              navigate("/login");
            }}
            key="4"
            icon={<UserOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {snap.activeIndex === 0 && <StudentHome />}
          {snap.activeIndex === 1 && <StudentCourses />}
          {snap.activeIndex === 2 && <StudentPayments />}
          {snap.activeIndex === 3 && <StudentProfile />}
          {snap.activeIndex === 5 && <StudentMarkings />}
          {snap.activeIndex === 8 && <HallArrangements />}
          {snap.activeIndex === 10 && <CanteenMenu />}
        </div>
      </Content>
    </Layout>
  );
};

export default StudentDashboard;
