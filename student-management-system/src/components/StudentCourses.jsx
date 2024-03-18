import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Tabs,
  message,
  Select,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { fetchLectureMaterials } from "../controllers/lectureMaterialController";
import moment from "moment";
import { createFeedback } from "../controllers/feedbackController";
const { Option } = Select;
const StudentCourses = () => {
  const [createFeedbackLoading, setCreateFeedbackLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [enrollmentKey, setEnrollmentKey] = useState();
  const [selctedCourse, setSelectedCourse] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledCoursesIds, setEnrolledCoursesIds] = useState([]);
  const [feedback, setFeedback] = useState();
  const [selectedFeedbackCourse, setSelectedFeedBackCourse] = useState();
  const [dates, setDates] = useState([]);
  const snap = useSnapshot(state);
  const getEnrolledCourses = async () => {
    const docRef = doc(db, "enrolls", snap.currentUser._id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const courses = docSnap.data()?.enrolledCourses;
      setEnrolledCoursesIds(courses);
      let en = [];
      if (courses) {
        courses.forEach((id) => {
          const c = snap.courses.find((cours) => cours.enrollmentKey === id);
          if (c) {
            en.push(c);
          }
        });
        if (en) {
          setSelectedCourse(en[0]);
          selectCourse(en[0]._id);
        }
      }
      console.log(en);
      setEnrolledCourses(en);
    }
  };
  const enrollToACourse = async () => {
    if (!enrollmentKey) {
      message.warning("Enter a valid enrollment key ");
      return;
    }
    let found = false;
    snap.courses.forEach((course) => {
      if (course.enrollmentKey === enrollmentKey) {
        found = true;
        return;
      }
    });
    if (!found) {
      message.warning("Enrollment key not found ");
      return;
    }
    try {
      await updateDoc(doc(db, "enrolls", snap.currentUser._id), {
        enrolledCourses: [...enrolledCoursesIds, enrollmentKey],
      }).then(() => {
        message.success("Enrolled successfully");
      });
    } catch (err) {
      await setDoc(doc(db, "enrolls", snap.currentUser._id), {
        enrolledCourses: [enrollmentKey],
      }).then(() => {
        message.success("Enrolled successfully");
      });
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const selectCourse = async (id) => {
    setLoading(true);
    setSelectedCourse(snap.courses.find((cours) => cours._id === id));
    await fetchLectureMaterials()
      .then((response) => {
        const materials = response.data;
        setCourseMaterials(materials);
        let dates = [];
        materials.forEach((material) => {
          if (!dates.includes(material.createdAt)) {
            dates.push(material.createdAt);
          }
        });
        setDates(dates);
      })
      .catch((err) => {
        console.log(`error getting lecture materials`);
      });
    setLoading(false);
  };
  return (
    <div style={{ width: "100vw" }}>
      <Row>
        <Col span={18}>
          <Tabs
            onChange={(key) => {
              console.log(key);
              setSelectedCourse(key);
              selectCourse(key);
            }}
          >
            {enrolledCourses?.map((course) => {
              return (
                <TabPane
                  tab={course?.name || "Unknown Course"}
                  key={course._id}
                >
                  <div
                    style={{
                      width: "90%",
                      height: "100%",
                    }}
                  >
                    {loading && <p>Loading course data</p>}
                    {!loading &&
                      dates.map((date) => {
                        const materials = courseMaterials.filter(
                          (course) => course.course._id === selctedCourse._id
                        );

                        return !materials ? (
                          <p>Nothing here</p>
                        ) : (
                          <div>
                            <h2 key={date}>{`${moment(date).format(
                              "YYYY-MM-DD"
                            )}`}</h2>
                            <Divider />
                            {materials.map((material) => (
                              <a
                                href={material.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <h3>{material.name}</h3>
                              </a>
                            ))}
                          </div>
                        );
                      })}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </Col>
        <Col span={6}>
          <Card>
            <h4>Enroll to a course</h4>
            <div style={{ height: 8 }} />
            <Input
              onChange={(e) => {
                setEnrollmentKey(e.target.value);
              }}
            />{" "}
            <div style={{ height: 8 }} />
            <Button
              onClick={() => {
                enrollToACourse();
              }}
            >
              Enroll
            </Button>
            <Divider />
            <h3>We admire your feedback</h3>
            <Select
              onChange={(val) => {
                setSelectedFeedBackCourse(val);
              }}
              style={{ width: "100%" }}
            >
              {snap.courses.map((course) => (
                <Option value={course._id}>{course.name}</Option>
              ))}
            </Select>
            <div style={{ height: 16 }} />
            <Input.TextArea
              onChange={(val) => {
                setFeedback(val.currentTarget.value);
              }}
            />
            <div style={{ height: 16 }} />
            <Button
              loading={createFeedbackLoading}
              onClick={async (e) => {
                setCreateFeedbackLoading(true);
                try {
                  if (feedback && selectedFeedbackCourse) {
                    await createFeedback({
                      feedback: feedback,
                      createdBy: snap.currentUser._id,
                      course: selectedFeedbackCourse,
                    });
                    setSelectedFeedBackCourse();
                    setFeedback("");
                    message.success("Thank you for your feedback");
                  }
                } catch (err) {
                  message.error(`Feedback failed, try again!`);
                }
                setCreateFeedbackLoading(false);
              }}
              type="primary"
            >
              Submit
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentCourses;
