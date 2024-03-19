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
  Row,
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
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const generateScheduleReport = (schedules) => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set the title of the document
    doc.setFontSize(20);
    doc.text("Schedule Report", 10, 10);

    // Set the column headers
    const headers = [
      ["Date and Time", "Number of Students", "Hall Number", "Status"],
    ];

    // Extract data from schedules and format it into an array of arrays
    const data = schedules.map((schedule) => [
      new Date(schedule.timeAndDate).toLocaleString(),
      schedule.numberOfStudents,
      schedule.hallNumber,
      schedule.status ? "Approved" : "Pending",
    ]);

    // Set font size and style for the table
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Add the table to the document
    doc.autoTable({
      startY: 20,
      head: headers,
      body: data,
    });

    // Save or download the PDF
    doc.save("schedule_report.pdf");
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
      title: "Approved Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status ? "Approved" : "Pending";
      },
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
      <Row justify={"space-between"}>
        <Button type="primary" onClick={handleAddRequest}>
          Request Hall
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            generateScheduleReport(requests);
          }}
        >
          Generate
        </Button>
      </Row>
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
