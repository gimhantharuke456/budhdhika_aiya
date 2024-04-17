import React from "react";
import { Layout, Menu } from "antd";
import { useSnapshot } from "valtio";
import state from "../utils";
import Teachers from "./Teachers";
import Notices from "./Notices";
import ManagerFeedbacks from "./ManagerFeedbacks";
import Materials from "./Materials";
import ManagerRequests from "./ManagerRequests";
import { useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;

const Dashboard = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item
            onClick={() => {
              state.activeIndex = 0;
            }}
            key="1"
          >
            Teachers
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 1;
            }}
            key="2"
          >
            Teacher Requests
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 2;
            }}
            key="3"
          >
            Notices Management
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 3;
            }}
            key="4"
          >
            Feedbacks
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.activeIndex = 4;
            }}
            key="5"
          >
            Materials
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            key="6"
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {snap.activeIndex === 0 && <Teachers />}
          {snap.activeIndex === 1 && <ManagerRequests />}
          {snap.activeIndex === 2 && <Notices />}
          {snap.activeIndex === 3 && <ManagerFeedbacks />}
          {snap.activeIndex === 4 && <Materials />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
