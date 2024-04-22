import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  message,
  Rate,
} from "antd";
import { fetchAboutSuppliments } from "../controllers/supplimentController";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  fetchSupplimentFeedbacks,
  addFeedback,
} from "../controllers/supplimentFeedbackController";

const CanteenMenu = () => {
  const [suppliments, setSuppliments] = useState([]);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedSuppliment, setSelectedSuppliment] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [form] = Form.useForm();
  const snap = useSnapshot(state);
  const userId = snap.currentUser?._id;

  useEffect(() => {
    fetchSuppliments();
  }, []);

  const fetchSuppliments = async () => {
    try {
      const response = await fetchAboutSuppliments();
      setSuppliments(response.data);
    } catch (error) {
      console.error("Error fetching suppliments:", error);
    }
  };

  const getFeedbacksBySupplimentId = async (supplimentId) => {
    try {
      const response = await fetchSupplimentFeedbacks(supplimentId);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const showModal = async (suppliment) => {
    setSelectedSuppliment(suppliment);
    await getFeedbacksBySupplimentId(suppliment._id);
    setFeedbackModal(true);
  };

  const handleAddFeedback = async (values) => {
    try {
      const feedbackData = {
        ...values,
        suppliment: selectedSuppliment._id,
        createdBy: userId,
      };
      await addFeedback(feedbackData);
      message.success("Feedback added successfully");
      setFeedbackModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div style={{ minHeight: 700 }}>
      <h1>Canteen Menu</h1>
      <Row gutter={[16, 16]} justify="space-around">
        {suppliments.map((suppliment) => (
          <Col key={suppliment._id}>
            <Card
              title={suppliment.name}
              style={{
                width: 300, // Set a fixed width
                height: 250, // Set a fixed height
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                borderRadius: "10px", // Added for rounded corners if desired
                overflow: "auto",
              }}
            >
              <p>Batch Number: {suppliment.batchNumber}</p>
              <p>Price: {suppliment.price}</p>
              <p>Quantity Availability: {suppliment.quantityAvailability}</p>
              <Button type="primary" onClick={() => showModal(suppliment)}>
                Add Feedback
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        visible={feedbackModal}
        title="Feedbacks"
        onCancel={() => setFeedbackModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddFeedback}>
          <Form.Item
            name="comment"
            label="Feedback"
            rules={[{ required: true, message: "Please enter your feedback" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Feedback
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CanteenMenu;
