/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../Courses/client";
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
  toggleShowEnrollments,
  enrollCourse,
  unenrollCourse,
  setCourses,
} from "../Courses/reducer";
import { RootState } from "../store";


export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

  useEffect(() => {fetchCourses();}, [currentUser]);

  if (!currentUser) return null;


  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
        if (c._id === course._id) { 
          return course; }
        else { 
          return c; }
    })));};



  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr/>

      <h5>
        New Course
        {/* <button
          className="btn btn-primary float-end me-2"
          onClick={fetchCourses}> Enrolled Courses
        </button>
        <button 
          className="btn btn-primary float-end me-2"
          onClick={allCourses}> All Courses
        </button> */}
        {currentUser.role === "FACULTY" && (
          <>
            <button
              onClick={onAddNewCourse}
              className="btn btn-success float-end"
              id="wd-add-new-course-click">
              Add
            </button>

            <button onClick={onUpdateCourse} className="btn btn-secondary float-end" id="wd-update-course-click" >
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
            onChange={(e) => setCourse({ ...course, name: e.target.value })}/>
          <FormControl
            defaultValue={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })}/>
        </>
      )}

      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((course: any) => (
          <Col
            key={course._id}
            className="wd-dashboard-course"
            style={{ width: "300px" }}>
            <Card>
              <CardImg
                src="/images/webdev.jpg"
                variant="top"
                width="100%"
                height={160}
              />
              <CardBody className="card-body">
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                  {course.name}
                </CardTitle>
                <CardText
                  className="wd-dashboard-course-description overflow-hidden"
                  style={{ height: "100px" }}>
                  {course.description}
                </CardText>

                {/* {fetchCourses(course._id) ? (
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
                )} */}

                {currentUser.role === "FACULTY" && (
                  <>
                    <button
                      className="btn btn-warning me-2 float-end"
                      onClick={() => setCourse(course)}>
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}>
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

