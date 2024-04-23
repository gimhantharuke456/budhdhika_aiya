import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Row } from "antd";
import * as Yup from "yup";
import MoneyTransactionService from "../services/moneyManagementController";
import jsPDF from "jspdf";
import "jspdf-autotable";
const { Option } = Select;

const MoneyTransactionFormValidationSchema = Yup.object().shape({
  type: Yup.string().required("Please select the type of transaction"),
  amount: Yup.number().required("Please input the amount"),
  givenBy: Yup.string().required("Please input the email of the giver"),
});

const CashManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await MoneyTransactionService.getAllMoneyTransactions();
      setTransactions(data);
    } catch (error) {
      message.error("Failed to fetch transactions");
    }
  };

  const showModal = (transaction = {}) => {
    setIsModalVisible(true);
    setEditingTransaction(transaction);
    form.setFieldsValue({
      type: transaction.type || "",
      amount: transaction.amount || "",
      givenBy: transaction.givenBy || "",
    });
  };
  const generateTransactionPDF = () => {
    // Create new jsPDF instance
    const doc = new jsPDF();

    // Set up header for the table
    const header = [["Type", "Amount", "Given By"]];

    // Prepare table data from transactions
    const data = transactions.map((transaction) => [
      transaction.type,
      transaction.amount,
      transaction.givenBy,
    ]);

    // Set up styling for the table
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont("helvetica", "bold");

    // Add header and table data to the document
    doc.text("Transaction Report", 14, 10); // Title
    doc.autoTable({
      startY: 20, // Start position of the table
      head: header,
      body: data,
    });

    // Save the PDF with filename "transaction_report.pdf"
    doc.save("transaction_report.pdf");
  };
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await MoneyTransactionFormValidationSchema.validate(
        { ...values },
        { abortEarly: false }
      );
      if (editingTransaction?._id) {
        await MoneyTransactionService.updateMoneyTransaction(
          editingTransaction._id,
          values
        );
        message.success("Transaction updated successfully");
      } else {
        await MoneyTransactionService.createMoneyTransaction(values);
        message.success("Transaction added successfully");
      }
      setIsModalVisible(false);
      loadTransactions();
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
        message.error("Operation failed: " + error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTransaction(null);
  };

  const handleDelete = async (transactionId) => {
    try {
      await MoneyTransactionService.deleteMoneyTransaction(transactionId);
      message.success("Transaction deleted successfully");
      loadTransactions();
    } catch (error) {
      message.error("Failed to delete transaction: " + error.message);
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Given By",
      dataIndex: "givenBy",
      key: "givenBy",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Filter transactions based on search value
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.givenBy.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Row justify={"space-between"} style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => showModal()}>
          Add Transaction
        </Button>
        <Button onClick={generateTransactionPDF}>Generate PDF</Button>
        <Input.Search
          placeholder="Search by Given By"
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200 }}
        />
      </Row>
      <Table dataSource={filteredTransactions} columns={columns} rowKey="_id" />
      <Modal
        title={editingTransaction?._id ? "Edit Transaction" : "Add Transaction"}
        visible={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="donation">Donation</Option>
              <Option value="petty_cash">Petty Cash</Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="givenBy"
            label="Given By"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CashManagement;
