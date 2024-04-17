import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CommentOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../utils";
import StudentRequests from "./StudentRequests";
import StudentFeedbacjs from "./StudentFeedbacjs";

const { Header, Content, Sider } = Layout;

const StudentDashboard = () => {
  const snap = useSnapshot(state);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item
            onClick={() => {
              state.studentActiveIndex = 0;
            }}
            key="1"
            icon={<UserOutlined />}
          >
            Send Requests
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.studentActiveIndex = 1;
            }}
            key="2"
            icon={<CommentOutlined />}
          >
            Send Feedbacks
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
          {snap.studentActiveIndex === 0 && <StudentRequests />}
          {snap.studentActiveIndex === 1 && <StudentFeedbacjs />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
