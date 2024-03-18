import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Table, message } from "antd";
import {
  fetchMarkings,
  createMarking,
  updateMarking,
  deleteMarking,
} from "../controllers/markingController";
import { fetchCourses } from "../controllers/courseController";
import { fetchUsers } from "../controllers/userController";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const StudentMarkings = () => {
  const [markings, setMarkings] = useState([]);
  const [filteredMarkings, setFilteredMarkings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMarking, setCurrentMarking] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterMarkingsByCourse();
  }, [selectedCourse]);

  const loadInitialData = async () => {
    const coursesRes = await fetchCourses();
    setCourses(coursesRes.data);
    const studentsRes = await fetchUsers();
    setStudents(studentsRes.data.filter((user) => user.role === "student"));
    const markingsRes = await fetchMarkings();
    setMarkings(markingsRes.data);
    setFilteredMarkings(markingsRes.data);
  };

  const showModal = (marking = null) => {
    setCurrentMarking(marking);
    setIsModalVisible(true);
    form.setFieldsValue(marking || { course: "", student: "", marks: 0 });
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (currentMarking) {
      await updateMarking(currentMarking._id, values);
      message.success("Marking updated");
    } else {
      await createMarking(values);
      message.success("Marking added");
    }
    setIsModalVisible(false);
    await loadInitialData();
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await deleteMarking(id);
    message.success("Marking deleted");
    await loadInitialData();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Course", "Student", "Marks"];
    const tableRows = [];

    filteredMarkings.forEach((marking) => {
      const courseName =
        courses.find((course) => course._id === marking.course._id)?.name ||
        "Unknown Course";
      const studentName =
        students.find((student) => student._id === marking.student._id)
          ?.username || "Unknown Student";
      const marks = marking.marks.toString();

      tableRows.push([courseName, studentName, marks]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Marking Report", 14, 15);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    doc.save(`marking-report_${dateStr}.pdf`);
  };

  const filterMarkingsByCourse = () => {
    console.log(selectedCourse);
    if (selectedCourse === "all") {
      setFilteredMarkings(markings);
    } else {
      const filtered = markings.filter(
        (marking) => marking.course._id === selectedCourse
      );
      setFilteredMarkings(filtered);
    }
  };

  const handleCourseFilterChange = (value) => {
    setSelectedCourse(value);
    setTimeout(1000, () => {
      filterMarkingsByCourse();
    });
  };
  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (courseId) => courseId.name,
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
      render: (studentId) => studentId?.username,
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
      }}
    >
      <div style={{ height: 16 }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          onChange={handleCourseFilterChange}
        >
          <Option key={"all"} value={"all"}>
            All
          </Option>
          {courses.map((course) => (
            <Option key={course._id} value={course._id}>
              {course.name}
            </Option>
          ))}
        </Select>
        <Button onClick={handleDownloadPDF} style={{ marginLeft: 8 }}>
          Download PDF Report
        </Button>
      </div>

      <Table dataSource={filteredMarkings} columns={columns} rowKey="_id" />
      <Modal
        title={currentMarking ? "Edit Marking" : "Add Marking"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select>
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="student"
            label="Student"
            rules={[{ required: true, message: "Please select a student!" }]}
          >
            <Select>
              {students.map((student) => (
                <Option key={student._id} value={student._id}>
                  {student?.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="marks"
            label="Marks (out of 100)"
            rules={[{ required: true, message: "Please input the marks!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentMarkings;
