import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import {
  fetchFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController";

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
        <Button onClick={() => handleDelete(record._id)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />
    </div>
  );
};

export default StaffFeedbacks;
