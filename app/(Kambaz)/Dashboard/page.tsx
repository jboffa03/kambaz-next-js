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
  setCourses,
  setEnrollments,
} from "../Courses/reducer";
import { RootState } from "../store";



export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.coursesReducer);
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
    const allCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

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

  const fetchAllEnrollments = async () => {
  try {
    const enrollments = await client.findMyCourses();
    dispatch(setEnrollments(enrollments));
  } catch (error) {
    console.error(error);
  }
};


  const onEnrollCourse = async (courseId: string) => {
  const newEnrollment = await client.enrollIntoCourse(currentUser._id, courseId);
  dispatch(setEnrollments([...enrollments, newEnrollment]));
};

  
  const onUnenrollCourse = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);
    dispatch(
      setEnrollments(enrollments.filter((e: any) => e.user !== currentUser._id && e.course !== courseId))
    );
  };

  useEffect(() => {
    fetchAllEnrollments();
  }, [currentUser, enrollments]);

  if (!currentUser) return null;
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";

  


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr/>

      <h5>
        New Course
        <button
          className="btn btn-primary float-end me-2"
          onClick={fetchCourses}> Enrolled Courses
        </button>
        <button 
          className="btn btn-primary float-end me-2"
          onClick={allCourses}> All Courses
        </button>

        {isFaculty ? (
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
        ): null}
      </h5>

      <br />
      {isFaculty ? (
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
      ) : null}

      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((course: any) => {
          return (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}>
              <Card>
                <CardImg
                  src="/images/webdev.jpg"
                  variant="top"
                  width="100%"
                  height={160}/>
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}>
                    {course.description}
                  </CardText>
                  <Link href={`/Courses/${course._id}/Home`}>
                    <Button variant="primary">Go</Button>
                  </Link>

                  {isStudent ? (
                    (enrollments.some((e: any) => e._id === course._id)
                  ) ? (
                      <button
                        className="btn btn-danger float-end"
                        onClick={() => onUnenrollCourse(course._id)}>
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success float-end"
                        onClick={() => onEnrollCourse(course._id)}>
                        Enroll
                      </button>
                    )
                  ) : null}

                  {isFaculty ? (
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
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

