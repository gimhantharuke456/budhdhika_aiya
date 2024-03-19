import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserByEmail, fetchUsers } from "../controllers/userController";
import state from "../store";
import { fetchCourses } from "../controllers/courseController";
import { message } from "antd";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
      return;
    }
    fetchUserByEmail(localStorage.getItem("email"))
      .then(async (res) => {
        await loadCourses();
        await loadUsers();
        state.currentUser = res.data;
        if (res.data.role === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/staff-dashboard");
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  const loadCourses = async () => {
    fetchCourses()
      .then((res) => {
        state.courses = res.data;
      })
      .catch((err) => {
        console.error("Fetching courses failed:", err);
        message.error({ message: "Failed to load courses" });
      });
  };
  const loadUsers = async () => {
    fetchUsers()
      .then((res) => {
        state.staff = res.data.filter((user) => user.role !== "student");
        state.students = res.data.filter((user) => user.role === "student");
        console.log(state.staff);
      })
      .catch((err) => {
        console.error("Fetching courses failed:", err);
        message.error({ message: "Failed to load courses" });
      });
  };
  return <div>Loading</div>;
};

export default Dashboard;
