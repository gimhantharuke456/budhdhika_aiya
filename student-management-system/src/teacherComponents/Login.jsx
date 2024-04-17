import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import TeacherController from "../services/teacherController";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    if (
      values.username === "manager@gmail.com" &&
      values.password === "manager123"
    ) {
      navigate("/dashboard");
    } else {
      try {
        const teacher = await TeacherController.loginTeacher(
          values.username,
          values.password
        );
        if (teacher) {
          if (values.username === "student@gmail.com") {
            navigate("/student-dashboard");
            message.success("Login successful");
          } else {
            navigate("/teacher-dashboard");
            message.success("Login successful");
          }
          localStorage.setItem("teacher", JSON.stringify(teacher));
        } else {
          message.error("Invalid username or password");
          return;
        }
      } catch (error) {
        console.error("Error logging in:", error);
        message.error("Failed to login");
        return;
      } finally {
        setLoading(false);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all fields");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 400 }}>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
