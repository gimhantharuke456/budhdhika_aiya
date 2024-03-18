import React, { useState } from "react";
import { Form, Input, Button, Card, Alert, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { registerUser } from "../controllers/userController"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
// Validation Schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError("");
    try {
      const response = await registerUser({
        ...values,
        role: "student",
      });
      
      if (response.status === 201) {
        localStorage.setItem("email", values.email);
        navigator("/");
      }

      message.success("User created successfully");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
      <Card title="Register" style={{ width: 300 }}>
        {error && <Alert message={error} type="error" showIcon />}
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
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
            <Form name="register_form" onFinish={() => handleSubmit(values)}>
              <Form.Item
                validateStatus={
                  touched.username && errors.username ? "error" : ""
                }
                help={
                  touched.username && errors.username ? errors.username : ""
                }
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                  loading={loading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Register;
