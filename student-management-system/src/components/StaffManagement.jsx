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
  role: Yup.string().required("Role is required"),
});

const StaffManagement = () => {
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
      state.staff = response.data.filter((user) => user.role !== "student");
      setUsers(state.staff);
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
      role: user.role || "student_manager",
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
        await registerUser({ ...values, password: "staff123" });
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
      title: "Name",
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
        Add User
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: "student_manager" }}
        >
          <Form.Item name="username" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="student_manager">Student Manager</Option>
              <Option value="admin">Admin</Option>
              <Option value="student">Student</Option>
              <Option value="module_manager">Module Manager</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="cash_flow_staff">Cash Flow Staff</Option>
              <Option value="non_academic_staff">Non-Academic Staff</Option>
              <Option value="class_schedule_manager">
                Class Schedule Manager
              </Option>
              <Option value="maintenance_manager">Maintenance Manager</Option>
              <Option value="canteen_manager">Canteen Manager</Option>
            </Select>
          </Form.Item>
          <h4>
            Default password for users :{" "}
            <span style={{ fontWeight: "bold" }}>staff123</span>
          </h4>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffManagement;
