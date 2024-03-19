import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import {
  fetchMaintenanceRequests,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  fetchMaintenanceRequestsByUser,
} from "../controllers/maintanceController";
import { useSnapshot } from "valtio";
import state from "../store";

const MaintenanceRequests = () => {
  const snap = useSnapshot(state);
  const userId = snap.currentUser?._id;
  const role = snap.currentUser?.role;
  const [requests, setRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    if (role == "maintenance_manager") {
      fetchAllRequests();
    } else {
      fetchRequestsByUser();
    }
  }, []);

  const fetchAllRequests = async () => {
    try {
      const response = await fetchMaintenanceRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };

  const fetchRequestsByUser = async () => {
    try {
      const response = await fetchMaintenanceRequestsByUser(userId);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests by user:", error);
    }
  };

  const handleCreateRequest = async (values) => {
    try {
      await createMaintenanceRequest({ ...values, createdBy: userId });

      await fetchAllRequests();
      await fetchRequestsByUser();
      message.success("Maintenance request created successfully");
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating maintenance request:", error);
    }
  };

  const handleUpdateRequest = async (id, values) => {
    try {
      await updateMaintenanceRequest(id, values);
      message.success("Maintenance request updated successfully");
      fetchAllRequests();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating maintenance request:", error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteMaintenanceRequest(id);
      message.success("Maintenance request deleted successfully");
      fetchAllRequests();
    } catch (error) {
      console.error("Error deleting maintenance request:", error);
    }
  };

  const handleEditRequest = (id) => {
    setSelectedRequestId(id);
    setModalVisible(true);
    const selectedRequest = requests.find((request) => request._id === id);
    form.setFieldsValue(selectedRequest);
  };

  const handleUpdateStatus = async (id, status, record) => {
    try {
      await updateMaintenanceRequest(id, { ...record, status });
      await fetchAllRequests();
      message.success("Maintenance request status updated successfully");
    } catch (err) {
      message.error("Error updating maintenance request status");
    }
  };

  const columns = [
    {
      title: "Request Details",
      dataIndex: "requestDetails",
      key: "requestDetails",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          {role === "maintenance_manager" && (
            <Select
              onChange={(value) =>
                handleUpdateStatus(record._id, value, record)
              }
              defaultValue={record.status}
              style={{ width: 120 }}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          )}
          {role !== "maintenance_manager" && (
            <Button onClick={() => handleEditRequest(record._id)}>Edit</Button>
          )}
          {role !== "maintenance_manager" && (
            <Button danger onClick={() => handleDeleteRequest(record._id)}>
              Delete
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Maintenance Requests</h1>
      <Button onClick={() => setModalVisible(true)}>Add Request</Button>
      <Table dataSource={requests} columns={columns} rowKey="_id" />

      <Modal
        title={selectedRequestId ? "Edit Request" : "Add Request"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => {
          form.validateFields().then((values) => {
            selectedRequestId
              ? handleUpdateRequest(selectedRequestId, values)
              : handleCreateRequest(values);
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Request Details"
            name="requestDetails"
            rules={[
              { required: true, message: "Please enter the request details" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaintenanceRequests;
