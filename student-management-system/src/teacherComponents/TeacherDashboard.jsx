import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../utils";
import TeacherRequests from "./TeacherRequests";
import ReferenceMaterials from "./ReferenceMaterials";
import HomeworkMaterials from "./HomeworkMaterials";
import TeacherProfile from "./TeacherProfile";
import StudentRequests from "./StudentRequests";
import { useNavigate } from "react-router-dom";
import TeacherNotices from "./TeacherNotices";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const TeacherDashboard = () => {
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
          <SubMenu key="sub1" icon={<UserOutlined />} title="Requests">
            <Menu.Item
              onClick={() => {
                state.teacherActiveIndex = 0;
              }}
              key="1"
            >
              Teacher Requests
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                state.teacherActiveIndex = 1;
              }}
              key="2"
            >
              Student Requests
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FileTextOutlined />} title="Materials">
            <Menu.Item
              onClick={() => {
                state.teacherActiveIndex = 2;
              }}
              key="3"
            >
              Reference Materials
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                state.teacherActiveIndex = 3;
              }}
              key="4"
            >
              Homework Materials
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            onClick={() => {
              state.teacherActiveIndex = 5;
            }}
            key="7"
          >
            Notices
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              state.teacherActiveIndex = 4;
            }}
            key="5"
          >
            Profile
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
          {snap.teacherActiveIndex === 0 && <TeacherRequests />}
          {snap.teacherActiveIndex === 1 && <StudentRequests />}
          {snap.teacherActiveIndex === 2 && <ReferenceMaterials />}
          {snap.teacherActiveIndex === 3 && <HomeworkMaterials />}
          {snap.teacherActiveIndex === 4 && <TeacherProfile />}
          {snap.teacherActiveIndex === 5 && <TeacherNotices />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
