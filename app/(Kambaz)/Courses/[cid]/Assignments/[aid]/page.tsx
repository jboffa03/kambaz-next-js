/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, updateAssignment } from "../reducer";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ParamValue } from "next/dist/server/request/params";
import * as client from "../client";
import { on } from "events";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const isNew = aid === "new";
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const dbAssign = assignments.find((a: { _id: ParamValue; }) => a._id === aid);

  const [form, setForm] = useState(
    dbAssign || {
      _id: uuidv4(),
      title: "",
      description: "",
      points: 0,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      course: cid,
    }
  );

  const onCreateAssignmentForCourse = async (assignment: any) => {
      if (!cid) return;
      // const newAssignment = { ...assignment, course: cid };
      const createdAssignment = await client.createAssignmentForCourse(cid as string, assignment);
      dispatch(setAssignments([...assignments, createdAssignment]));
    };

  const onUpdateAssignment = async (assignment: any) => {
      await client.updateAssignment(assignment);
      const newAssignment = assignments.map((a: any) => a._id === assignment._id ? assignment : a );
      dispatch(setAssignments(newAssignment));
    };

  const update = (field: string, value: any) =>
    setForm({ ...form, [field]: value });

  const save = () => {
    if (isNew) onCreateAssignmentForCourse(form);
    else onUpdateAssignment(form);
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <Container id="wd-assignments-editor" className="py-3">
      <h3>{isNew ? "Create Assignment" : "Edit Assignment"}</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={form.points}
              onChange={(e) => update("points", Number(e.target.value))}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
          <Form.Group as={Row} controlId="wd-group">
            <Form.Label>
              Assignment Group
            </Form.Label>
            <Col sm={8}>
              <Form.Select defaultValue={"ASSIGNMENTS"}>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="LABS">LABS</option>
                <option value="EXAMS">EXAMS</option>
              </Form.Select>
            </Col>
          </Form.Group>
         </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={form.dueDate}
              onChange={(e) => update("dueDate", e.target.value)}
            />
          </Col>
        </Row>
        

        <Row className="mb-3">
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={form.availableFrom}
              onChange={(e) => update("availableFrom", e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="date"
              value={form.availableUntil}
              onChange={(e) => update("availableUntil", e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>

          <Button variant="danger" onClick={save}>
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}
