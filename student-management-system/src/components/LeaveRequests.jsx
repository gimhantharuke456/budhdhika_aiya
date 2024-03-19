import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import {
  fetchLeaveRequestsByCreatedBy,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
} from "../controllers/leaveRequestController";
import { useSnapshot } from "valtio";
import state from "../store";

import moment from "moment";

const LeaveRequests = () => {
  const snap = useSnapshot(state);
  const currentUserId = snap.currentUser?._id;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  const loadLeaveRequests = async () => {
    try {
      const response = await fetchLeaveRequestsByCreatedBy(currentUserId);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleAddRequest = () => {
    setEditingRequest(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditRequest = (request) => {
    const formattedRequest = {
      ...request,
      leaveDate: [moment(request.leaveDate[0]), moment(request.leaveDate[1])], // Format leaveDate as an array of Moment objects
    };

    setEditingRequest(formattedRequest);
    form.setFieldsValue(formattedRequest);
    setModalVisible(true);
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteLeaveRequest(id);
      await loadLeaveRequests();
      message.success("Leave request deleted successfully");
    } catch (error) {
      console.error("Error deleting leave request:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingRequest) {
        await updateLeaveRequest(editingRequest._id, values);
        message.success("Leave request updated successfully");
      } else {
        await addLeaveRequest({
          ...values,
          createdBy: currentUserId,
          approved: false,
        });
        message.success("Leave request added successfully");
      }
      setModalVisible(false);
      loadLeaveRequests();
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  const columns = [
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Leave Dates",
      dataIndex: "leaveDate",
      key: "leaveDate",
      render: (leaveDate) => moment(leaveDate).format("MMMM Do YYYY"), // Format leave date using Moment.js
    },
    {
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => {
        return approved ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditRequest(record)}>Edit</Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => handleDeleteRequest(record._id)}
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddRequest}>
        Request a Leave
      </Button>
      <Table dataSource={leaveRequests} columns={columns} rowKey="_id" />

      <Modal
        title={editingRequest ? "Edit Leave Request" : "Request a Leave"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please enter the reason" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Leave Dates"
            name="leaveDate"
            rules={[{ required: true, message: "Please select leave dates" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRequest ? "Update" : "Request"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeaveRequests;
