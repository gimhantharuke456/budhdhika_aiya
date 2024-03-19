import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import {
  fetchLeaveRequests,
  deleteLeaveRequest,
  updateLeaveRequest,
} from "../controllers/leaveRequestController";
import moment from "moment";
const LeaveRequestAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  const loadLeaveRequests = async () => {
    try {
      const response = await fetchLeaveRequests();
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      message.error("Failed to fetch leave requests");
    }
  };

  const handleApprove = async (record) => {
    try {
      await updateLeaveRequest(record._id, { ...record, approved: true });
      message.success("Leave request approved successfully");
      loadLeaveRequests();
    } catch (error) {
      console.error("Error approving leave request:", error);
      message.error("Failed to approve leave request");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeaveRequest(id);
      message.success("Leave request deleted successfully");
      loadLeaveRequests();
    } catch (error) {
      console.error("Error deleting leave request:", error);
      message.error("Failed to delete leave request");
    }
  };

  const columns = [
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Leave Dates",
      dataIndex: "leaveDate",
      key: "leaveDate",
      render: (leaveDate) => moment(leaveDate).format("MMMM Do YYYY"),
    },
    {
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => {
        return approved ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          {!record.approved && (
            <Popconfirm
              title="Are you sure you want to approve this leave request?"
              onConfirm={() => handleApprove(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Approve</Button>
            </Popconfirm>
          )}
          <Popconfirm
            title="Are you sure you want to delete this leave request?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Leave Requests</h1>
      <Table dataSource={leaveRequests} columns={columns} rowKey="_id" />
    </div>
  );
};

export default LeaveRequestAdmin;
