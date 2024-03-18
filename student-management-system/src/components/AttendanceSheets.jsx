import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Modal,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Upload,
  Button,
  message,
  Table,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  fetchAttendanceRecords,
  addAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from "../controllers/attendanceController";
import { fetchCourses } from "../controllers/courseController";
import { uploadFile } from "../controllers/uploadFileService";

const { Option } = Select;

const AttendanceSheets = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCourses();
    loadAttendanceRecords();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response.data);
    } catch (error) {
      message.error("Failed to fetch courses");
    }
  };

  const loadAttendanceRecords = async () => {
    try {
      const response = await fetchAttendanceRecords();
      setAttendanceRecords(response.data);
    } catch (error) {
      message.error("Failed to fetch attendance records");
    }
  };

  const showModal = (record = null) => {
    setIsModalVisible(true);
    setEditingRecord(record);
    form.setFieldsValue({
      course: record ? record.course : "",
      date: record ? record.date : "",
      time: record ? record.time : "",
      fileUrl: record ? record.fileUrl : "",
    });
  };

  const handleOk = async () => {
    const values = await form.validateFields();

    const file = values.file[0].originFileObj;
    const filePath = `lectureMaterials/${file.name}`;
    uploadFile(file, filePath)
      .then(async (fileUrl) => {
        const formData = {
          ...values,
          course: values.course,
          fileUrl: fileUrl,
        };
        if (editingRecord) {
          await updateAttendanceRecord(editingRecord._id, formData);
          message.success("Attendance record updated");
        } else {
          await addAttendanceRecord(formData);
          message.success("Attendance record added");
        }
        setIsModalVisible(false);
        loadAttendanceRecords();
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        message.error("Failed to upload file");
      });

    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await deleteAttendanceRecord(id);
    message.success("Attendance record deleted");
    loadAttendanceRecords();
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (courseId) => courseId.name,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => moment(time, "HH:mm:ss").format("h:mm a"),
    },
    {
      title: "File URL",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Attendance Record
      </Button>
      <Table dataSource={attendanceRecords} columns={columns} rowKey="_id" />
      <Modal
        title={
          editingRecord ? "Edit Attendance Record" : "Add Attendance Record"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="course" label="Course" rules={[{ required: true }]}>
            <Select>
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>

          <Form.Item
            name="file"
            label="File"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true, message: "Please upload the file!" }]}
          >
            <Upload action="/upload" listType="text" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttendanceSheets;
