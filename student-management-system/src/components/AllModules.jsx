import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import * as Yup from "yup";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCourses,
} from "../controllers/courseController";
import { useSnapshot } from "valtio";
import state from "../store";

const { Option } = Select;

const AllModules = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const snap = useSnapshot(state);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const response = await fetchCourses();
    setCourses(response.data);
  };

  const showModal = (course = null) => {
    setEditingCourse(course);
    form.setFieldsValue(
      course
        ? course
        : { name: "", description: "", enrollmentKey: "", instructor: "" }
    );
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        enrollmentKey: Yup.string().required("Enrollment Key is required"),
        instructor: Yup.string().required("Instructor is required"),
      });

      await schema.validate(values, { abortEarly: false });

      if (editingCourse) {
        await updateCourse(editingCourse._id, values);
        message.success("Course updated successfully");
      } else {
        await createCourse(values);
        message.success("Course created successfully");
      }

      loadCourses();
      setIsModalVisible(false);
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
        message.error("Failed to save the course");
      }
    }
  };

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
    message.success("Course deleted successfully");
    loadCourses();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Enrollment Key",
      dataIndex: "enrollmentKey",
      key: "enrollmentKey",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      render: (instructor) => instructor?.username,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search courses"
          onSearch={handleSearch}
          enterButton
        />
      </div>

      <div style={{ height: 16 }} />
      <Table dataSource={filteredCourses} columns={columns} rowKey="_id" />
    </div>
  );
};

export default AllModules;
