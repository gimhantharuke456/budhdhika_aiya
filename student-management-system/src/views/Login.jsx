import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../controllers/userController";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError(""); // Reset error message
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
            <Form
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
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
              <Link to="/reset-password" style={{ float: "right" }}>
                Forgot password?
              </Link>
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
        <p> Don't have an account ?</p> <Link to={"/register"}>Register </Link>{" "}
        Now
      </Card>
    </div>
  );
};

export default Login;
