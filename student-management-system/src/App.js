import "antd/dist/reset.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import StudentRegister from "./views/StudentRegister";
import StaffDashboard from "./views/StaffDashboard";
import StudentDashboard from "./views/StudentDashboard";
import ResetPassword from "./views/ResetPassword";
//oshan
import TeacherLogin from "./teacherComponents/Login";
import TeacherTeacherDashboard from "./teacherComponents/TeacherDashboard";
import TeacherStudentDashboard from "./teacherComponents/StudentDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard" element={<Dashboard />} />
        <Route
          path="/teacher/teacher-dashboard"
          element={<TeacherTeacherDashboard />}
        />
        <Route
          path="/teacher/student-dashboard"
          element={<TeacherStudentDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
