import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Table,
  Col,
  Row,
  Card,
} from "antd";
import {
  fetchPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnapshot } from "valtio";
import state from "../store";

const paymentValidationSchema = Yup.object().shape({
  payAmount: Yup.number()
    .required("Payment amount is required")
    .positive("Payment amount must be positive"),
  reason: Yup.string().required("Reason is required"),
});

const StudentPayments = () => {
  const snap = useSnapshot(state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);

  const formik = useFormik({
    initialValues: {
      payAmount: "",
      reason: "",
    },
    validationSchema: paymentValidationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        if (editingPayment) {
          updatePayment(editingPayment?._id, values).then(() => {
            message.success("Payment updated successfully");
            loadPayments();
            resetForm();
            setIsModalVisible(false);
          });
        } else {
          createPayment({ ...values, payedBy: snap.currentUser?._id }).then(
            () => {
              message.success("Payment added successfully");
              loadPayments();
              resetForm();
              setIsModalVisible(false);
            }
          );
        }
      } catch (err) {
        message.error(`Error while making payment`);
      }
    },
  });

  const loadPayments = async () => {
    const fetchedPayments = await fetchPayments();

    setPayments(
      fetchedPayments.data.filter(
        (payment) => payment.payedBy?._id === snap.currentUser?._id
      )
    );
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleEditClick = (payment) => {
    showModal(payment);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deletePayment(id);
      message.success("Payment deleted successfully");
      loadPayments();
    } catch (err) {
      message.error("Failed to delete payment");
    }
  };

  const columns = [
    {
      title: "Amount(LKR)",
      dataIndex: "payAmount",
      key: "payAmount",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEditClick(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteClick(record?._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const showModal = (payment = null) => {
    setIsModalVisible(true);
    setEditingPayment(payment);
    formik.setValues({
      payAmount: payment ? payment.payAmount : "",
      reason: payment ? payment.reason : "",
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formik.resetForm();
  };

  return (
    <div
      style={{
        width: "90%",
      }}
    >
      <Row>
        <Col span={16}>
          <div style={{ height: 16 }} />
          <Button type="primary" onClick={() => showModal()}>
            Add Payment
          </Button>
          <div style={{ height: 16 }} />
          <Table dataSource={payments} columns={columns} rowKey="_id" />
        </Col>
        <Col span={8}></Col>
      </Row>
      {/* Modal and form for adding/editing payments */}
      <Modal
        title={editingPayment ? "Edit Payment" : "Add Payment"}
        visible={isModalVisible}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Payment Amount">
            <Input
              name="payAmount"
              onChange={formik.handleChange}
              value={formik.values.payAmount}
            />
            {formik.errors.payAmount && formik.touched.payAmount ? (
              <div>{formik.errors.payAmount}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Reason">
            <Input
              name="reason"
              onChange={formik.handleChange}
              value={formik.values.reason}
            />
            {formik.errors.reason && formik.touched.reason ? (
              <div>{formik.errors.reason}</div>
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
      {/* List payments here */}
    </div>
  );
};

export default StudentPayments;
