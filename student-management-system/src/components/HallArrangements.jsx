import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Card } from "antd";
import moment from "moment";
import { fetchHallRequests } from "../controllers/hallRequestController";
import CalendarComponent from "./CalendarComponent";

const HallArrangements = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchHallRequests().then((result) => {
      setBookings(result.data.filter((hall) => hall.status === true));
    });
    console.log(bookings);
  }, []);

  useEffect(() => {
    fetchHallRequests().then((result) => {
      setBookings(result.data.filter((hall) => hall.status === true));
    });
  }, []);
  const today = new Date();
  const events = bookings.map((arrangement, index) => ({
    title: `Hall ${arrangement.hallNumber} ${arrangement.createdBy.username}`,

    start: index === 0 ? today : arrangement.startDate,
    end: arrangement.endDate,
    id: index.toString(),
  }));

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw", padding: 16 }}>
      <CalendarComponent events={events} />
    </div>
  );
};

export default HallArrangements;
