import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import {
  fetchFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StaffFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const response = await fetchFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      message.error("Failed to fetch feedbacks");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      message.success("Feedback deleted successfully");
      loadFeedbacks();
    } catch (error) {
      message.error("Failed to delete feedback");
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Feedbacks", 10, 10);
    feedbacks.forEach((feedback, index) => {
      doc.text(`${index + 1}. ${feedback.feedback}`, 10, 20 + index * 10);
    });
    doc.save("feedbacks.pdf");
  };

  const columns = [
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Course",
      dataIndex: "course", // Assuming you have course name in the feedback object
      key: "course",
      render: (_, record) => record.course.name,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleDownload}
      >
        Download Feedbacks
      </Button>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />
    </div>
  );
};

export default StaffFeedbacks;
