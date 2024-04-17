import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
} from "antd";
import MaterialController from "../services/materialController";
import { uploadFile } from "../services/uploadFileService";
import { UploadOutlined } from "@ant-design/icons";
const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const data = await MaterialController.getAllMaterials();

      setMaterials(data.filter((material) => material.type === "teacher"));
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleAddMaterial = async (values) => {
    try {
      if (selectedMaterial) {
        const { file, ...materialData } = values;
        const documentUrl = await uploadFile(file, "materials");
        await MaterialController.updateMaterial(selectedMaterial._id, {
          ...materialData,
          documentUrl,
        });
        setModalVisible(false);
        await fetchMaterials();
        message.success("Material updated successfully");
      } else {
        const { file, ...materialData } = values;
        const documentUrl = await uploadFile(file, "materials");
        await MaterialController.createMaterial({
          ...materialData,
          documentUrl,
        });
        setModalVisible(false);
        await fetchMaterials();
        message.success("Material added successfully");
      }
    } catch (error) {
      console.error("Error adding material:", error);
      message.error("Failed to add material");
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      await MaterialController.deleteMaterial(materialId);
      fetchMaterials();
      message.success("Material deleted successfully");
    } catch (error) {
      console.error("Error deleting material:", error);
      message.error("Failed to delete material");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Date Uploaded",
      dataIndex: "dateUploaded",
      key: "dateUploaded",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <span>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this material?"
              onConfirm={() => handleDeleteMaterial(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" style={{ marginLeft: 8 }}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedMaterial(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleUpload = async (file) => {
    try {
      // Uploading file to Firebase Storage
      return await uploadFile(file, "materials");
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload file");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setSelectedMaterial(null);
          setModalVisible(true);
        }}
      >
        Add Material
      </Button>
      <Table dataSource={materials} columns={columns} rowKey="_id" />

      <Modal
        title={selectedMaterial ? "Edit Material" : "Add Material"}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleAddMaterial(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="file"
            label="File"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload customRequest={handleUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Materials;
