import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Upload,
  Card,
  Grid,
  Row,
  Col,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createStudentProfile,
  fetchStudentProfileByEmail,
  updateStudentProfile,
} from "../controllers/studentProfileController"; // Adjust the import path
import { uploadFile } from "../controllers/uploadFileService";
import { useSnapshot } from "valtio";
import state from "../store";
import Title from "antd/es/typography/Title";

const StudentProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [profileCompleted, setProfileCompleted] = useState(false);
  const snap = useSnapshot(state);
  // Define the Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.date().required("Date of birth is required").nullable(),
    image: Yup.string().required("Image is required"),
  });

  // useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      image: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (!currentUser) {
        try {
          const response = await createStudentProfile({
            ...values,
            user: snap.currentUser._id,
          });
          message.success("Profile created successfully");
          console.log("Profile created:", response);
        } catch (error) {
          message.error("Failed to create profile");
          console.error("Create profile error:", error);
        }
      } else {
        try {
          const response = await updateStudentProfile(currentUser._id, {
            ...values,
          });
          message.success("Profile updated successfully");
          console.log("Profile created:", response);
        } catch (error) {
          message.error("Failed to update profile");
          console.error("Create profile error:", error);
        }
      }
      setLoading(false);
    },
  });

  const handleUpload = async (options) => {
    const { file } = options;
    setLoading(true);
    try {
      const imageUrl = await uploadFile(file, `studentProfiles/${file.name}`);
      formik.setFieldValue("image", imageUrl);
      setLoading(false);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      setLoading(false);
      message.error(`${file.name} file upload failed.`);
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    fetchStudentProfileByEmail(localStorage.getItem("email"))
      .then((res) => {
        if (res.status === 200) {
          formik.setValues({
            lastName: res.data.lastName,
            firstName: res.data.firstName,
            dateOfBirth: res.data.dateOfBirth,
            image: res.data.image,
          });
          setImageUrl(res.data.image);
          setCurrentUser(res.data);
          setProfileCompleted(true);
        } else {
          setProfileCompleted(false);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div
      style={{
        flex: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        width: "50%",
      }}
    >
      {" "}
      <Card style={{}}>
        <Title>Profile</Title>
        {!profileCompleted && <p>Complete your profile</p>}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                objectFit: "fill",
                border: "3px solid darkBlue",
              }}
            />
          )}
        </div>
        <div style={{ height: 16 }} />
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Row>
            <Col span={10}>
              <Form.Item label="First Name">
                <Input
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <Form.Item label="Last Name">
                <Input
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Date of Birth">
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
              value={
                formik.values.dateOfBirth
                  ? moment(formik.values.dateOfBirth)
                  : null
              }
            />
          </Form.Item>
          <Form.Item label="Profile Image">
            <Upload
              customRequest={handleUpload}
              listType="picture-card"
              showUploadList={false}
            >
              {formik.values.image ? (
                <img
                  src={formik.values.image}
                  alt="avatar"
                  style={{ width: "100%", height: "60%" }}
                />
              ) : loading ? (
                <LoadingOutlined />
              ) : (
                <PlusOutlined />
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              {!currentUser ? "Create Profile" : `Update profile`}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StudentProfile;
