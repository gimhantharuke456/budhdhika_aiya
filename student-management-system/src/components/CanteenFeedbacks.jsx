import React, { useState, useEffect } from "react";
import { Table, Button, message, Modal } from "antd";
import {
  fetchSupplimentFeedbacks,
  deleteFeedback,
} from "../controllers/supplimentFeedbackController";

const CanteenFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const response = await fetchSupplimentFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      message.success("Feedback deleted successfully");
      loadFeedbacks();
      setDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const showDeleteModal = (id) => {
    setSelectedFeedbackId(id);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          danger
          type="dashed"
          onClick={() => showDeleteModal(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Canteen Feedbacks</h1>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />
      <Modal
        visible={deleteModalVisible}
        title="Confirm Delete"
        onOk={() => handleDelete(selectedFeedbackId)}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this feedback?</p>
      </Modal>
    </div>
  );
};

export default CanteenFeedbacks;
