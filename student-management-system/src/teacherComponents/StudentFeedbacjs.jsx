import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
} from "antd";
import FeedbackController from "../services/feedbackController";
import TeacherController from "../services/teacherController";
import { useSnapshot } from "valtio";
import state from "../store";
import axios from "axios";

const { Option } = Select;

const StudentFeedbacjs = () => {
  const snap = useSnapshot(state);
  const [feedbacks, setFeedbacks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedFeedback, setSelectedFeedback] = useState();
  const baseUrl = "http://localhost:8080/api/teacher-feedbacks";
  useEffect(() => {
    fetchFeedbacks();
    fetchTeachers();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const data = await axios.get(baseUrl).then((result) => result.data);
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await TeacherController.getAllTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleAddFeedback = async (values) => {
    try {
      if (selectedFeedback) {
        await updateFeedback(selectedFeedback._id, values);
      } else {
        await createFeedback({
          ...values,
          createdBy: snap.currentUser?._id,
        });
      }
      setModalVisible(false);
      await fetchFeedbacks();
      setSelectedFeedback();
      message.success("Feedback added successfully");
    } catch (error) {
      console.error("Error adding feedback:", error);
      message.error("Failed to add feedback");
    } finally {
      setSelectedFeedback();
    }
  };

  const updateFeedback = async (id, data) => {
    try {
      await axios.put(`${baseUrl}/${id}`, data);
    } catch (er) {}
  };

  const createFeedback = async (data) => {
    try {
      await axios.post(`${baseUrl}`, data);
    } catch (er) {}
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`${baseUrl}/${feedbackId}`);
      await fetchFeedbacks();
      message.success("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error("Failed to delete feedback");
    }
  };

  const columns = [
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (text) => <span>{text?.username}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this feedback?"
            onConfirm={() => handleDeleteFeedback(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="dashed" style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedFeedback(record);
    form.setFieldsValue({ ...record, teacher: record.teacher._id });
    setModalVisible(true);
  };

  return (
    <div style={{ minWidth: "90vw", marginTop: 16 }}>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setModalVisible(true)}
      >
        Add Feedback
      </Button>
      <Table dataSource={feedbacks} columns={columns} rowKey="_id" />

      <Modal
        title="Add Feedback"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddFeedback(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="teacher"
            label="Teacher"
            rules={[{ required: true, message: "Please select a teacher" }]}
          >
            <Select>
              {teachers.map((teacher) => (
                <Option key={teacher._id} value={teacher._id}>
                  {teacher?.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              { required: true, message: "Please enter feedback content" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentFeedbacjs;
