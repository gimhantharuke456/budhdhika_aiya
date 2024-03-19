import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  DatePicker,
} from "antd";
import {
  fetchHallRequests,
  fetchHallRequestByUser,
  createHallRequest,
  updateHallRequest,
  deleteHallRequest,
} from "../controllers/hallRequestController";
import { useSnapshot } from "valtio";
import state from "../store";

import moment from "moment";

const RequestHoll = () => {
  const snap = useSnapshot(state);
  const userId = snap.currentUser?._id;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const response = await fetchHallRequestByUser(userId); // Replace userId with the actual user ID
      setRequests(response.data);
    } catch (error) {
      message.error("Failed to fetch hall requests");
    }
    setLoading(false);
  };

  const handleAddRequest = () => {
    setSelectedRequestId(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditRequest = (id) => {
    setSelectedRequestId(id);
    setModalVisible(true);
    const selectedRequest = requests.find((request) => request._id === id);

    // Ensure the timeAndDate property exists and is in a valid format
    const formattedTimeAndDate = moment(selectedRequest.timeAndDate).isValid()
      ? moment(selectedRequest.timeAndDate)
      : moment();

    form.setFieldsValue({
      ...selectedRequest,
      timeAndDate: formattedTimeAndDate,
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedRequestId) {
        // Update request
        await updateHallRequest(selectedRequestId, values);
        message.success("Hall request updated successfully");
      } else {
        // Create request
        await createHallRequest({ ...values, createdBy: userId });
        message.success("Hall request created successfully");
      }
      setModalVisible(false);
      loadRequests();
    } catch (error) {
      message.error("Failed to submit request");
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteHallRequest(id);
      message.success("Hall request deleted successfully");
      loadRequests();
    } catch (error) {
      message.error("Failed to delete hall request");
    }
  };

  const columns = [
    {
      title: "Number of Students",
      dataIndex: "numberOfStudents",
      key: "numberOfStudents",
    },
    {
      title: "Time and Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
      render: (timeAndDate) => moment(timeAndDate).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Hall Number",
      dataIndex: "hallNumber",
      key: "hallNumber",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEditRequest(record._id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this request?"
            onConfirm={() => handleDeleteRequest(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddRequest}>
        Request Hall
      </Button>
      <Table
        dataSource={requests}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={selectedRequestId ? "Edit Hall Request" : "Add Hall Request"}
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Number of Students"
            name="numberOfStudents"
            rules={[
              {
                required: true,
                message: "Please enter the number of students",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Time and Date"
            name="timeAndDate"
            rules={[
              { required: true, message: "Please enter the time and date" },
            ]}
          >
            <DatePicker showTime={{ format: "HH:mm" }} />
          </Form.Item>
          <Form.Item
            label="Hall Number"
            name="hallNumber"
            rules={[
              { required: true, message: "Please enter the hall number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedRequestId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestHoll;
