import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Row } from "antd";
import jsPDF from "jspdf";
import {
  fetchAboutSuppliments,
  addAboutRecord,
  updateAboutRecord,
  deleteAboutRecord,
} from "../controllers/supplimentController";

const SupplimentManagement = () => {
  const [form] = Form.useForm();
  const [suppliments, setSuppliments] = useState([]);
  const [editingSuppliment, setEditingSuppliment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadSuppliments();
  }, []);

  const loadSuppliments = async () => {
    try {
      const response = await fetchAboutSuppliments();
      setSuppliments(response.data);
    } catch (error) {
      console.error("Error fetching suppliments:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const showModal = (suppliment = null) => {
    setEditingSuppliment(suppliment);
    form.setFieldsValue(suppliment);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingSuppliment) {
        await updateAboutRecord(editingSuppliment._id, values);
        message.success("Suppliment updated successfully");
      } else {
        await addAboutRecord(values);
        message.success("Suppliment created successfully");
      }
      loadSuppliments();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAboutRecord(id);
      message.success("Suppliment deleted successfully");
      loadSuppliments();
    } catch (error) {
      console.error("Error deleting suppliment:", error);
    }
  };

  const columns = [
    {
      title: "Batch Number",
      dataIndex: "batchNumber",
      key: "batchNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity Availability",
      dataIndex: "quantityAvailability",
      key: "quantityAvailability",
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

  const filteredSuppliments = suppliments.filter((suppliment) =>
    suppliment.batchNumber.includes(searchValue)
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Suppliment Report", 10, 10);
    doc.autoTable({
      head: [["Batch Number", "Name", "Price", "Quantity Availability"]],
      body: filteredSuppliments.map((suppliment) => [
        suppliment.batchNumber,
        suppliment.name,
        suppliment.price,
        suppliment.quantityAvailability,
      ]),
    });
    doc.save("suppliment_report.pdf");
  };

  return (
    <div>
      <Row justify={"space-between"}>
        <Input
          placeholder="Search by batch number"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ width: 200, marginBottom: 10 }}
        />
        <Button type="primary" onClick={() => showModal()}>
          Add Suppliment
        </Button>
        <Button onClick={generateReport}>Generate Report</Button>
      </Row>
      <Table dataSource={filteredSuppliments} columns={columns} rowKey="_id" />
      <Modal
        title={editingSuppliment ? "Edit Suppliment" : "Add Suppliment"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="batchNumber"
            label="Batch Number"
            rules={[{ required: true, message: "Please enter batch number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantityAvailability"
            label="Quantity Availability"
            rules={[
              { required: true, message: "Please enter quantity availability" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplimentManagement;
