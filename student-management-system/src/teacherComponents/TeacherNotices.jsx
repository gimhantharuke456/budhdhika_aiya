import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import List from "antd/es/list";
import NoticeController from "../services/noticeController";
import { Card } from "antd";
const TeacherNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    NoticeController.getAllNotices().then((data) => setNotices(data));
  }, []);

  return (
    <div>
      <Title level={2}>Notices</Title>
      <List
        dataSource={notices}
        renderItem={(item) => (
          <Card style={{ marginBottom: 4 }}>
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={new Date(item.datePublished).toLocaleString()}
              />
              {item.content}
            </List.Item>
          </Card>
        )}
      />
    </div>
  );
};

export default TeacherNotices;
