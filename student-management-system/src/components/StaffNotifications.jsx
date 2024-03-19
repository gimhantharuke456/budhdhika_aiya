import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import * as Yup from "yup";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController";

const { TextArea } = Input;

const StaffNotifications = () => {
  const [form] = Form.useForm();
  const [announcements, setAnnouncements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await fetchAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const showModal = (announcement = null) => {
    setEditingAnnouncement(announcement);
    form.setFieldsValue(
      announcement ? announcement : { title: "", message: "" }
    );
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        message: Yup.string().required("Message is required"),
      });

      await schema.validate(values, { abortEarly: false });

      if (editingAnnouncement) {
        await updateAnnouncement(editingAnnouncement._id, values);
        message.success("Announcement updated successfully");
      } else {
        await createAnnouncement(values);
        message.success("Announcement created successfully");
      }

      loadAnnouncements();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          form.setFields([
            {
              name: err.path,
              errors: [err.message],
            },
          ]);
        });
      } else {
        message.error("Failed to save the announcement");
      }
    }
  };

  const handleDelete = async (announcementId) => {
    await deleteAnnouncement(announcementId);
    message.success("Announcement deleted successfully");
    loadAnnouncements();
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Announcement
      </Button>
      <Table dataSource={announcements} columns={columns} rowKey="_id" />
      <Modal
        title={editingAnnouncement ? "Edit Announcement" : "Add Announcement"}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffNotifications;
