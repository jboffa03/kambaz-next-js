"use client";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  toggleShowEnrollments,
  enrollCourse,
  unenrollCourse,
} from "../Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, enrollments, showAllCourses } = useSelector(
    (state: any) => state.coursesReducer
  );

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  if (!currentUser) return null;

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end me-2"
          onClick={() => dispatch(toggleShowEnrollments())}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
        {currentUser.role === "FACULTY" && (
          <>
            <button
              className="btn btn-secondary float-end me-2"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>

            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </>
        )}
      </h5>

      <br />
      {currentUser.role === "FACULTY" && (
        <>
          <FormControl
            defaultValue={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            defaultValue={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}

      <hr />
      <h2>Published Courses ({visibleCourses.length})</h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {visibleCourses.map((course: any) => (
          <Col
            key={course._id}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <CardBody>
                <CardTitle>{course.name}</CardTitle>

                <CardText
                  className="overflow-hidden"
                  style={{ height: "100px" }}
                >
                  {course.description}
                </CardText>

                {isEnrolled(course._id) ? (
                  <Link href={`/Courses/${course._id}/Home`}>
                    <Button variant="primary">Go</Button>
                  </Link>
                ) : (
                  <Button variant="secondary" disabled>
                    Locked
                  </Button>
                )}

                {isEnrolled(course._id) ? (
                  <button
                    className="btn btn-danger float-end"
                    onClick={() =>
                      dispatch(
                        unenrollCourse({
                          userId: currentUser._id,
                          courseId: course._id,
                        })
                      )
                    }
                  >
                    Unenroll
                  </button>
                ) : (
                  <button
                    className="btn btn-success float-end"
                    onClick={() =>
                      dispatch(
                        enrollCourse({
                          userId: currentUser._id,
                          courseId: course._id,
                        })
                      )
                    }
                  >
                    Enroll
                  </button>
                )}

                {currentUser.role === "FACULTY" && (
                  <>
                    <button
                      className="btn btn-warning me-2 float-end"
                      onClick={() => setCourse(course)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger float-end"
                      onClick={() => dispatch(deleteCourse(course._id))}
                    >
                      Delete
                    </button>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
