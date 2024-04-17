import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import TeacherRequestController from "../services/teacherRequestConrtoller";
import moment from "moment";
const TeacherRequests = () => {
  const [requests, setRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRequest, setSelectedRequest] = useState(null);
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await TeacherRequestController.getAllTeachersRequests();
      setRequests(data.filter((request) => request.type === "teacher"));
    } catch (error) {
      console.error("Error fetching teacher requests:", error);
    }
  };

  const handleAddRequest = async (values) => {
    try {
      const tId = JSON.parse(localStorage.getItem("teacher"))["teacher"]["_id"];

      if (!selectedRequest) {
        await TeacherRequestController.createTeacherRequest({
          ...values,
          teacher: tId,
        });
      } else {
        await TeacherRequestController.updateTeacherRequest(
          selectedRequest._id,
          {
            ...values,
          }
        );
      }
      setModalVisible(false);
      await fetchRequests();
      message.success("Teacher request added successfully");
    } catch (error) {
      console.error("Error adding teacher request:", error);
      message.error("Failed to add teacher request");
    }
  };
  const handleEdit = (record) => {
    setSelectedRequest(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await TeacherRequestController.deleteTeacherRequest(id);
      await fetchRequests();
      message.success("Teacher request deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher request:", error);
      message.error("Failed to delete teacher request");
    }
  };

  const columns = [
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this request?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setModalVisible(true)}
      >
        Add Your Request
      </Button>
      <Table dataSource={requests} columns={columns} rowKey="_id" />

      <Modal
        title="Add Teacher Request"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddRequest(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="content"
            label="Content"
            rules={[
              { required: true, message: "Please enter request content" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherRequests;
