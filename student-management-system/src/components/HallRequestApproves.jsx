import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Row } from "antd";
import {
  fetchHallRequests,
  updateHallRequest,
  deleteHallRequest,
} from "../controllers/hallRequestController";
import jsPDF from "jspdf";
import "jspdf-autotable";
const HallRequestApproves = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const response = await fetchHallRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching hall requests:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateHallRequest(id, {
        status: status === "approved" ? true : false,
      });
      message.success("Request status updated successfully");
      fetchAllRequests();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteHallRequest(id);
      message.success("Request deleted successfully");
      fetchAllRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const columns = [
    {
      title: "Date and Time",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Number of Students",
      dataIndex: "numberOfStudents",
      key: "numberOfStudents",
    },
    {
      title: "Hall Number",
      dataIndex: "hallNumber",
      key: "hallNumber",
    },
    {
      title: "Status",
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
          {!record.status && (
            <Button
              type="primary"
              onClick={() => handleUpdateStatus(record._id, "approved")}
            >
              Approve
            </Button>
          )}
          <Button
            style={{ marginLeft: "10px", marginRight: "10px" }}
            danger
            onClick={() => handleUpdateStatus(record._id, "rejected")}
          >
            Reject
          </Button>
          <Button type="dashed" onClick={() => handleDeleteRequest(record._id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

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

  return (
    <div>
      <Row justify={"space-between"}>
        <h1>Hall Request Approvals</h1>
        <Button type="dashed" onClick={() => generateScheduleReport(requests)}>
          Generate Report
        </Button>
      </Row>
      <Table dataSource={requests} columns={columns} rowKey="_id" />
    </div>
  );
};

export default HallRequestApproves;
