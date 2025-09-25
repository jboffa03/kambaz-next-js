import Link from "next/link";
import "../../../styles.css"
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical, IoNewspaperOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";


export default function Assignments() {
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
          }}/>
        <input
          type="search"
          placeholder="Search for Assignment"
          className="form-control form-control-sm"
          aria-label="Search assignments"
          style={{ width: "220px", height: "40px", paddingLeft: "36px" }}/>
          </div>
        </div>

        <AssignmentControls />
      </div><br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            </div>

            <div className="d-flex align-items-center gap-2">
              <span style={{
                  display: "inline-block",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontSize: "0.75rem",
                  background: "white",
                  lineHeight: 1,}}>
                40% of Total
              </span>
              <FaPlus className="position-relative" style={{ bottom: "1px" }} />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignments p-3 ps-1">
              <Link href="/Courses/1234/Assignments/123" 
                className="w-100 p-3 ps-1 text-reset text-decoration-none">
              <BsGripVertical className="me-2 fs-3" /> 
              <IoNewspaperOutline className="text-success me-2 fs-3"/>
              A1 <LessonControlButtons /><br />
                <div className="d-inline-block ms-5 fs-6">
                <span style={{ color: "red" }}> Multiple Modules</span> | <b> Not available until</b> May 6 at 11:59pm |{" "}
                <br />
                <b> Due</b> May 13 at 11:59pm | 100 points
                </div></Link>
            </ListGroupItem>

            <ListGroupItem className="wd-assignments p-3 ps-1">
              <Link href="/Courses/1234/Assignments/123" 
                className="w-100 p-3 ps-1 text-reset text-decoration-none">
              <BsGripVertical className="me-2 fs-3" /> 
              <IoNewspaperOutline className="text-success me-2 fs-3"/>
              A2 <LessonControlButtons /><br />
                <div className="d-inline-block ms-5 fs-6">
                <span style={{ color: "red" }}> Multiple Modules</span> | <b> Not available until</b> May 13 at 11:59pm |{" "}
                <br />
                <b> Due</b> May 20 at 11:59pm | 100 points
                </div></Link>
            </ListGroupItem>

            <ListGroupItem className="wd-assignments p-3 ps-1">
              <Link href="/Courses/1234/Assignments/123" 
                className="w-100 p-3 ps-1 text-reset text-decoration-none">
              <BsGripVertical className="me-2 fs-3" /> 
              <IoNewspaperOutline className="text-success me-2 fs-3"/>
              A3 <LessonControlButtons /><br />
                <div className="d-inline-block ms-5 fs-6">
                <span style={{ color: "red" }}> Multiple Modules</span> | <b> Not available until</b> May 20 at 11:59pm |{" "}
                <br />
                <b> Due</b> May 27 at 11:59pm | 100 points
                </div></Link>
            </ListGroupItem>
            </ListGroup>
            
        </ListGroupItem>
    </ListGroup>
    </div>
  );
}
