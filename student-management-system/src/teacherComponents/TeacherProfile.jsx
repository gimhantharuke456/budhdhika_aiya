import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import TeacherController from "../services/teacherController";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTeacherProfile();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      const tId = JSON.parse(localStorage.getItem("teacher"))["teacher"]["_id"];
      const teacherProfile = await TeacherController.getTeacherById(tId);
      setTeacher(teacherProfile);
      form.setFieldsValue(teacherProfile); // Set initial form values
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      await TeacherController.updateTeacher(teacher._id, values);
      message.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating teacher profile:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <div>
      {teacher && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          style={{ maxWidth: 400 }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="ID Number"
            name="idNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default TeacherProfile;
