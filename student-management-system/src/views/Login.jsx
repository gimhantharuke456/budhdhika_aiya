import React, { useState } from "react";
import { Form, Input, Button, Card, Modal, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { loginUser, updateUserPassword } from "../controllers/userController";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const PasswordResetSchema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePasswordReset = async (values, actions) => {
    try {
      const response = await updateUserPassword({
        email: values.email,
        newPassword: values.newPassword,
      });
      message.success("Password updated successfully");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update password. Please try again.");
    }
    actions.setSubmitting(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError("");
    try {
      const response = await loginUser(values);
      message.success("Welcome back");
      localStorage.setItem("email", values.email);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onFinish={handleSubmit}>
              <Form.Item
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
                help={
                  touched.password && errors.password ? errors.password : ""
                }
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <Button type="link" onClick={showModal}>
                  Reset Password
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
        <Modal
          title="Reset Password"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Formik
            initialValues={{ newPassword: "", email: "" }}
            validationSchema={PasswordResetSchema}
            onSubmit={handlePasswordReset}
          >
            {(formikProps) => (
              <Form onFinish={formikProps.handleSubmit}>
                <Input
                  prefix={<MailOutlined />}
                  name="email"
                  placeholder="Email"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                <div style={{ height: 10 }} />
                <Input.Password
                  prefix={<LockOutlined />}
                  name="newPassword"
                  placeholder="New Password"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                <div style={{ height: 10 }} />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={formikProps.isSubmitting}
                >
                  Update Password
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </Card>
    </div>
  );
};

export default Login;
