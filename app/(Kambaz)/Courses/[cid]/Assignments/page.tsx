/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical, IoNewspaperOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { CiSearch } from "react-icons/ci";
import { ParamValue } from "next/dist/server/request/params";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const courseAssignments = assignments.filter((a: { course: ParamValue; }) => a.course === cid);

  const confirmDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div className="position-relative me-2">
            <CiSearch
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(0,0,0,0.45)",
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              placeholder="Search for Assignment"
              className="form-control form-control-sm"
              aria-label="Search assignments"
              style={{ width: "220px", height: "40px", paddingLeft: "36px" }}
            />
          </div>
            <AssignmentControls />
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            </div>
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: "0.75rem",
                  background: "white",
                  lineHeight: 1,
                }}>
                40% of Total
              </span>
              <FaPlus className="position-relative" style={{ bottom: "1px" }} />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          </ListGroupItem>
          </ListGroup>
            

      <ListGroup>
        {courseAssignments.map((assignment: 
        { _id: Key | null; 
          title: string | null; 
          availableUntil: any; 
          dueDate: any; 
          points: any; }) => (
          <ListGroupItem key={assignment._id} className="d-flex justify-content-between align-items-start">
            <Link
              href={`/Courses/${cid}/Assignments/${assignment._id}`}
              className="text-decoration-none text-dark"
              style={{ flexGrow: 1 }}>
              <BsGripVertical className="me-2 fs-3" />
                  <IoNewspaperOutline className="text-success me-2 fs-3" />
                  {assignment.title} <LessonControlButtons />
                  <br />
                  <div className="d-inline-block ms-5 fs-6">
                    <span style={{ color: "red" }}> Multiple Modules</span> |{" "}
                    <b> Not available until</b> {assignment.availableUntil || "TBD"} |{" "}
                    <br />
                    <b> Due</b> {assignment.dueDate || "TBD"} | {assignment.points || "100"} points
                  </div>
            </Link>

            <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(assignment._id)}>
            <FaTrash />
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
