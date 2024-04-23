import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import PaymentService from "../services/studentPaymentcontroller";

const StudentPayment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const paymentData = await PaymentService.getAllPayments();
      setPayments(paymentData);
    } catch (error) {
      message.error("Failed to fetch payments: " + error);
    }
  };

  const columns = [
    {
      title: "Payment Amount",
      dataIndex: "payAmount",
      key: "payAmount",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Paid By",
      dataIndex: "payedBy",
      key: "payedBy",
      render: (_, record) => {
        return <p>{record.payedBy?.username ?? "N/A"}</p>;
      },
    },
  ];

  return (
    <div>
      <h2>Student Payments</h2>
      <Table dataSource={payments} columns={columns} rowKey="_id" />
    </div>
  );
};

export default StudentPayment;
