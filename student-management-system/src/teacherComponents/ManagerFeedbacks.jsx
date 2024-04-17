import React, { useState, useEffect } from "react";
import FeedbackController from "../services/feedbackController";
import { Button, Row, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
const ManagerFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const fetchedFeedbacks = await FeedbackController.getAllFeedbacks();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const columns = [
    {
      title: "Teacher's Name",
      dataIndex: "teacherName",
      key: "teacherName",
      render: (_, record) => record.teacher.name,
    },
    {
      title: "Feedback",
      dataIndex: "content",
      key: "content",
    },
  ];
  const generatePdf = () => {
    const doc = new jsPDF();
    const feedbackData = feedbacks.map((feedback, index) => [
      index + 1,
      feedback.teacher.name,
      feedback.content,
    ]);

    doc.autoTable({
      head: [["#", "Teacher's Name", "Feedback"]],
      body: feedbackData,
    });

    doc.save("feedbacks.pdf");
  };

  return (
    <div>
      <Row justify={"space-between"}>
        <h1>Manager Feedbacks</h1>
        <Button
          onClick={() => {
            generatePdf();
          }}
        >
          Generate Pdf
        </Button>
      </Row>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ManagerFeedbacks;
