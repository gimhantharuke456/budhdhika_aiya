import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Select } from "antd";
import TeacherRequestController from "../services/teacherRequestConrtoller";
import moment from "moment";
const { Option } = Select;

const ManagerRequests = () => {
  const [requests, setRequests] = useState([]);

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

  const handleStatusChange = async (value, requestId) => {
    try {
      await TeacherRequestController.updateTeacherRequest(requestId, {
        status: value,
      });
      message.success("Status updated successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await TeacherRequestController.deleteTeacherRequest(requestId);
      message.success("Teacher request deleted successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error deleting teacher request:", error);
      message.error("Failed to delete teacher request");
    }
  };

  const columns = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (text) => <span> {} </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record._id)}
        >
          <Option value="pending">Pending</Option>
          <Option value="reviewed">Reviewed</Option>
          <Option value="resolved">Resolved</Option>
        </Select>
      ),
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure delete this request?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="primary">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={requests} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ManagerRequests;
