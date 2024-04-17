import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Row,
} from "antd";
import TeacherController from "../services/teacherController";
import Search from "antd/es/input/Search";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [cteachers, setCteachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [form] = Form.useForm();

  const fetchTeachers = async () => {
    try {
      const data = await TeacherController.getAllTeachers();
      setTeachers(data);
      setCteachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = async (values) => {
    try {
      if (!selectedTeacher) {
        await TeacherController.createTeacher({
          ...values,
          password: "teacher123",
        });
        setModalVisible(false);
        fetchTeachers();
        message.success("Teacher added successfully");
      } else {
        await TeacherController.updateTeacher(selectedTeacher._id, values);
        setModalVisible(false);
        fetchTeachers();
        message.success("Teacher updated successfully");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      message.error("Failed to add teacher");
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await TeacherController.deleteTeacher(teacherId);
      fetchTeachers();
      message.success("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      message.error("Failed to delete teacher");
    }
  };
  const handleSearch = () => {
    if (searchInput.length === 0) {
      setTeachers(cteachers);
      return;
    }

    const filteredTeachers = cteachers.filter((teacher) =>
      teacher.idNumber.startsWith(searchInput)
    );
    setTeachers(filteredTeachers);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "ID Number", dataIndex: "idNumber", key: "idNumber" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this teacher?"
            onConfirm={() => handleDeleteTeacher(record._id)}
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
    setSelectedTeacher(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  return (
    <div>
      <Row justify={"space-between"}>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => setModalVisible(true)}
        >
          Add Teacher
        </Button>
        <Search
          style={{ width: 600 }}
          placeholder="Search teachers by id"
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch();
          }}
        />
        <Button
          type="dashed"
          onClick={() => {
            setTeachers(cteachers);
          }}
        >
          Reset
        </Button>
      </Row>
      <div style={{ height: 16 }} />
      <Table dataSource={teachers} columns={columns} rowKey="_id" />
      <Modal
        title={selectedTeacher ? "Edit teacher" : "Add Teacher"}
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
              handleAddTeacher(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter teacher's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="idNumber"
            label="ID Number"
            rules={[
              { required: true, message: "Please enter teacher's ID number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
