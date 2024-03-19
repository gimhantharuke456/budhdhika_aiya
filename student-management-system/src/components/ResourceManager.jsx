import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal, message, Row } from "antd";
import {
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController";
import jsPDF from "jspdf";
import "jspdf-autotable";
const ResourceManager = () => {
  const [form] = Form.useForm();
  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const response = await fetchResources();
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const showModal = (resource = null) => {
    setEditingResource(resource);
    form.setFieldsValue(resource);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingResource) {
        await updateResource(editingResource._id, values);
        message.success("Resource updated successfully");
      } else {
        await createResource(values);
        message.success("Resource created successfully");
      }
      loadResources();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      message.success("Resource deleted successfully");
      loadResources();
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = ["Resource Name", "Supplier Name", "Cost", "Description"];
    const data = resources.map((resource) => [
      resource.resourceName,
      resource.supplierName,
      resource.cost,
      resource.description || "N/A",
    ]);
    doc.autoTable({
      head: [columns],
      body: data,
    });
    doc.save("resources.pdf");
  };

  const columns = [
    {
      title: "Resource Name",
      dataIndex: "resourceName",
      key: "resourceName",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button
            style={{ marginLeft: "8px" }}
            danger
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row justify={"space-between"}>
        <Button type="primary" onClick={() => showModal()}>
          Add Resource
        </Button>
        <Button type="dashed" onClick={() => exportToPDF()}>
          Download Report
        </Button>
      </Row>
      <div style={{ height: 8 }} />
      <Table dataSource={resources} columns={columns} rowKey="_id" />
      <Modal
        title={editingResource ? "Edit Resource" : "Add Resource"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="resourceName"
            label="Resource Name"
            rules={[{ required: true, message: "Please enter resource name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="supplierName"
            label="Supplier Name"
            rules={[{ required: true, message: "Please enter supplier name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Cost"
            rules={[{ required: true, message: "Please enter cost" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourceManager;
