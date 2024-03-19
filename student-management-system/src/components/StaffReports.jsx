import React from "react";
import { Tabs } from "antd";
import LectureMaterials from "./LectureMaterials";
import MarkingSchems from "./MarkingSchems";
import AttendanceSheets from "./AttendanceSheets";
import { useSnapshot } from "valtio";
import state from "../store";

const { TabPane } = Tabs;

const StaffReports = () => {
  const snap = useSnapshot(state);
  return (
    <div
      className="staff-reports-container"
      style={{ padding: "20px", marginTop: "20px", backgroundColor: "#fff" }}
    >
      <Tabs defaultActiveKey="1">
        {(snap.currentUser?.role === "student_manager" ||
          snap.currentUser?.role === "module_manager") && (
          <TabPane tab="Lecture Materials" key="1">
            <LectureMaterials />
          </TabPane>
        )}
        {(snap.currentUser?.role === "student_manager" ||
          snap.currentUser?.role === "module_manager") && (
          <TabPane tab="Markings" key="2">
            <MarkingSchems />
          </TabPane>
        )}
        <TabPane tab="Attendance Sheets" key="3">
          <AttendanceSheets />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StaffReports;
