import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import NoticeController from "../services/noticeController";
import moment from "moment";
const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState();
  const [form] = Form.useForm();

  const fetchNotices = async () => {
    try {
      const data = await NoticeController.getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAddNotice = async (values) => {
    try {
      if (!selectedNotice) {
        await NoticeController.createNotice(values);
        setModalVisible(false);
        await fetchNotices();
        message.success("Notice added successfully");
      } else {
        await NoticeController.updateNotice(selectedNotice._id, values);
        setModalVisible(false);
        fetchNotices();
        message.success("Notice updated successfully");
      }
    } catch (error) {
      console.error("Error adding notice:", error);
      message.error("Failed to add notice");
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      await NoticeController.deleteNotice(noticeId);
      fetchNotices();
      message.success("Notice deleted successfully");
    } catch (error) {
      console.error("Error deleting notice:", error);
      message.error("Failed to delete notice");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Date",
      dataIndex: "datePublished",
      key: "datePublished",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this notice?"
            onConfirm={() => handleDeleteNotice(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedNotice(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setModalVisible(true)}
      >
        Add Notice
      </Button>
      <Table dataSource={notices} columns={columns} rowKey="_id" />

      <Modal
        title={selectedNotice ? "Edit Notice" : "Add Notice"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddNotice(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter notice title" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter notice content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Notices;
