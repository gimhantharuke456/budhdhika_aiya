import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { resetUserPassword } from "../controllers/userController";
import * as Yup from "yup";
import { useFormik } from "formik";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await resetUserPassword({ email: values.email });
        message.success("Password reset link has been sent to your email.");
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to send password reset link."
        );
      }
      setLoading(false);
      setSubmitting(false);
    },
  });

  return (
    <div style={{ maxWidth: 300, margin: "auto", marginTop: "20vh" }}>
      <h2>Reset Password</h2>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="formik-error">{formik.errors.email}</div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="reset-password-form-button"
            loading={loading}
          >
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
