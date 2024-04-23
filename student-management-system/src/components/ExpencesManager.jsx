import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Row,
} from "antd";
import * as Yup from "yup";
import ExpenseService from "../controllers/expencesService";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
const { Search } = Input;

const ExpenseFormValidationSchema = Yup.object().shape({
  type: Yup.string().required("Please input the type of expense"),
  amount: Yup.number().required("Please input the amount"),
  date: Yup.date().required("Please select the date"),
});

const ExpencesManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await ExpenseService.getAllExpenses();
      setExpenses(data);
    } catch (error) {
      message.error("Failed to fetch expenses");
    }
  };

  const filterExpenses = (exp) => {
    return (
      exp.type.toLowerCase().includes(searchText.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const showModal = (expense = {}) => {
    setIsModalVisible(true);
    setEditingExpense(expense);
    form.setFieldsValue({
      type: expense.type || "",
      amount: expense.amount || "",
      date: expense.date ? moment(expense.date) : null,
      description: expense.description || "",
    });
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await ExpenseFormValidationSchema.validate(values, { abortEarly: false });
      if (editingExpense?._id) {
        await ExpenseService.updateExpense(editingExpense._id, values);
        message.success("Expense updated successfully");
      } else {
        await ExpenseService.createExpense(values);
        message.success("Expense added successfully");
      }
      setIsModalVisible(false);
      loadExpenses();
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
    setEditingExpense(null);
  };

  const handleDelete = async (expenseId) => {
    try {
      await ExpenseService.deleteExpense(expenseId);
      message.success("Expense deleted successfully");
      loadExpenses();
    } catch (error) {
      message.error("Failed to delete expense: " + error.message);
    }
  };

  const generateExpensePDF = () => {
    // Create new jsPDF instance
    const doc = new jsPDF();

    // Set up header for the table
    const header = [["Type", "Amount", "Date", "Description"]];

    // Prepare table data from expenses
    const data = expenses
      .filter(filterExpenses)
      .map((expense) => [
        expense.type,
        expense.amount,
        moment(expense.date).format("YYYY-MM-DD"),
        expense.description,
      ]);

    // Set up styling for the table
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont("helvetica", "bold");

    // Add header and table data to the document
    doc.text("Expense Report", 14, 10); // Title
    doc.autoTable({
      startY: 20, // Start position of the table
      head: header,
      body: data,
    });

    // Save the PDF with filename "expense_report.pdf"
    doc.save("expense_report.pdf");
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
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

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by type or description"
          allowClear
          enterButton
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Row justify={"space-between"}>
        <Button type="primary" onClick={() => showModal()}>
          Add Expense
        </Button>
        <Button type="dashed" onClick={generateExpensePDF}>
          Download Report
        </Button>
      </Row>
      <div style={{ height: 16 }} />
      <Table
        dataSource={expenses.filter(filterExpenses)}
        columns={columns}
        rowKey="_id"
      />
      <Modal
        title={editingExpense?._id ? "Edit Expense" : "Add Expense"}
        visible={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpencesManager;
