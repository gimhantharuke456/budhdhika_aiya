import React, { useState, useEffect } from "react";
import { Table, message, Button } from "antd";
import { fetchUsers } from "../controllers/userController";
import jsPDF from "jspdf";
import "jspdf-autotable";

const NonAcademicList = () => {
  const [nonAcademicUsers, setNonAcademicUsers] = useState([]);

  useEffect(() => {
    loadNonAcademicUsers();
  }, []);

  const loadNonAcademicUsers = async () => {
    try {
      const response = await fetchUsers();
      setNonAcademicUsers(
        response.data.filter((user) => user.role === "non_academic_staff")
      );
    } catch (error) {
      message.error("Failed to fetch non-academic users");
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Non-Academic Users Report", 10, 10);
    nonAcademicUsers.forEach((user, index) => {
      const yPos = 20 + index * 10;
      doc.text(
        `${index + 1}. Name: ${user.username}, Email: ${user.email}`,
        10,
        yPos
      );
    });
    doc.save("non_academic_users_report.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <h1>Non-Academic Users</h1>
      <Button
        type="primary"
        onClick={generateReport}
        style={{ marginBottom: 16 }}
      >
        Generate Report
      </Button>
      <Table dataSource={nonAcademicUsers} columns={columns} rowKey="_id" />
    </div>
  );
};

export default NonAcademicList;
