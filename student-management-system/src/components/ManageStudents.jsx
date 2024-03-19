import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import * as Yup from "yup";
import {
  fetchUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import state from "../store";

const { Option } = Select;

const UserFormValidationSchema = Yup.object().shape({
  username: Yup.string().required("Please input the user's name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ManageStudents = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      state.students = response.data.filter((user) => user.role === "student");
      setUsers(state.students);
    } catch (error) {
      message.error("Failed to fetch users");
    }
  };

  const showModal = (user = {}) => {
    setIsModalVisible(true);
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username || "",
      email: user.email || "",
    });
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await UserFormValidationSchema.validate(
        { ...values },
        { abortEarly: false }
      );
      if (editingUser?._id) {
        await updateUser(editingUser._id, values);
        message.success("User updated successfully");
      } else {
        console.log({
          ...values,
          password: "student123",
          role: "student",
        });
        await registerUser({
          ...values,
          password: "student123",
          role: "student",
        });
        message.success("User added successfully");
      }
      setIsModalVisible(false);
      loadUsers();
      form.resetFields();
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          form.setFields([
            {
              name: err.path,
              errors: [err.message],
            },
          ]);
        });
      } else {
        message.error("Operation failed: " + error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      message.success("User deleted successfully");
      loadUsers();
    } catch (error) {
      message.error("Failed to delete user: " + error.message);
    }
  };

  const columns = [
    {
      title: "IT Number",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Student
      </Button>
      <Table dataSource={users} columns={columns} rowKey="_id" />
      <Modal
        title={editingUser?._id ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" initialValues={{ role: "staff" }}>
          <Form.Item
            name="username"
            label="IT Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageStudents;
