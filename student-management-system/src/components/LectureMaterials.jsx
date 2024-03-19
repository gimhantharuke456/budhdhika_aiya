import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Table,
  Space,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchCourses } from "../controllers/courseController";
import {
  fetchLectureMaterials,
  createLectureMaterial,
  deleteLectureMaterial,
} from "../controllers/lectureMaterialController";
import { uploadFile } from "../controllers/uploadFileService";

const { Option } = Select;

const LectureMaterials = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courses, setCourses] = useState([]);
  const [lectureMaterials, setLectureMaterials] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCourses();
    loadLectureMaterials();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response.data); // Assuming the response data structure is directly usable
    } catch (error) {
      message.error("Failed to fetch courses");
    }
  };

  const loadLectureMaterials = async () => {
    try {
      const response = await fetchLectureMaterials();
      setLectureMaterials(response.data); // Assuming the response data structure is directly usable
    } catch (error) {
      message.error("Failed to fetch lecture materials");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const file = values.file[0].originFileObj;
        const filePath = `lectureMaterials/${file.name}`;

        uploadFile(file, filePath)
          .then(async (fileUrl) => {
            const materialData = {
              name: values?.name,
              course: values?.course,
              fileUrl, // Use the uploaded file URL
            };
            await createLectureMaterial(materialData);
            await loadLectureMaterials();
            setIsModalVisible(false);
            form.resetFields();

            message.success("Lecture material added successfully");
          })
          .catch((error) => {
            console.error("Upload failed:", error);
            message.error("Failed to upload file");
          });
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
        message.error("Failed to add lecture material");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Related Course",
      dataIndex: "course",
      key: "course",
      render: (text, record) => record.course.name,
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
        <Space size="middle">
          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>{" "}
        </Space>
      ),
    },
  ];

  const handleDelete = async (courseId) => {
    await deleteLectureMaterial(courseId);
    message.success("Course deleted successfully");
    loadLectureMaterials();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Lecture Material
      </Button>
      <Table dataSource={lectureMaterials} columns={columns} rowKey="_id" />
      <Modal
        title="Add Lecture Material"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="lectureMaterialForm">
          <Form.Item
            name="name"
            label="Material Name"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course"
            label="Related Course"
            rules={[
              { required: true, message: "Please select the related course!" },
            ]}
          >
            <Select showSearch placeholder="Select a course">
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>
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

export default LectureMaterials;
