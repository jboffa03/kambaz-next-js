"use client";
import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
    const [module, setModule] = useState({
    id: "1-1", name: "Web Development",
    description: "Learn to build web applications",
    course: "Full Stack Development",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Assignment Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

    <a id="wd-update-assignment-completed"
       className="btn btn-primary float-end"
       href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
      Update Completion </a>

    <div className="w-75" id="wd-assignment-completed">
      <FormCheck
        type="checkbox"
        id="wd-assignment-completed-true"
        label="Completed"
        checked={assignment.completed === true}
        onChange={() => setAssignment({ ...assignment, completed: true })}
      />
      <FormCheck
        type="checkbox"
        id="wd-assignment-completed-false"
        label="Uncompleted"
        checked={assignment.completed === false}
        onChange={() => setAssignment({ ...assignment, completed: false })}
      />
    </div><hr />

    <a id="wd-update-assignment-score"
       className="btn btn-primary float-end"
       href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
      Update Score </a>
    <FormControl className="w-50" id="wd-assignment-score"
      defaultValue={assignment.score} type="number" onChange={(e) =>
        setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>

    <hr />

      <a id="wd-update-module-name"
        className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name</a>
        <FormControl className="w-50" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
        <a id="wd-retrieve-modules" className="btn btn-primary"
            href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
        </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
        <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Module Name
        </a>
      <hr />

    </div>
);}
