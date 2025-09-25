"use client";
import React, { JSX, useState } from "react";
import Link from "next/link";
import { Container, Form, Row, Col, Button, FormGroup, FormLabel, FormControl, FormSelect, FormCheck } from "react-bootstrap";

export default function AssignmentEditor(): JSX.Element {
  return (
    <Container id="wd-assignments-editor" className="py-3">
      <Form>
        <Col xs={12} sm={4}>
        <FormGroup controlId="wd-name" className="mb-3">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            placeholder={"A1"}/>
        </FormGroup>
        <FormGroup controlId="wd-description" className="mb-3">
          <FormControl
            as="textarea"
            rows={4}
            placeholder={"Assignment Description"}/>
        </FormGroup></Col>


          <Col xs={12} sm={4}>
            <FormGroup as ={Row} controlId="wd-points">
              <FormLabel column sm={2}>Points</FormLabel>
              <Col sm={8}>
              <FormControl
                type="number"
                placeholder = {"100"}/>
                </Col>
            </FormGroup>
          </Col>

            <Col xs={12} sm={4}>
            <FormGroup as={Row} controlId="wd-group">
              <FormLabel column sm={4}>Assignment Group</FormLabel>
              <Col sm={8}>
              <FormSelect defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="LABS">LABS</option>
                <option value="EXAMS">EXAMS</option>
              </FormSelect>
              </Col>
            </FormGroup>
            </Col>

            <Col xs={12} sm={4}>
            <FormGroup as={Row} controlId="wd-display-grade-as">
              <FormLabel column sm={4}>Display Grade as</FormLabel>
              <Col sm={8}>
              <FormSelect defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </FormSelect>
              </Col>
            </FormGroup>
            </Col><br/>


        <Row className="g-3 mb-3">
          <Col xs={12} sm={4}>
          <FormLabel className="mb-2">Submission Type</FormLabel>
          <div className="border rounded p-3">
            <FormGroup controlId="wd-submission-type" className="mb-3">
              <FormSelect defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </FormSelect>
                  </FormGroup>

              <FormLabel className="mb-2">Online Entry Options</FormLabel>
                  <div>
                    <FormCheck label="Text Entry" />
                    <FormCheck label="Website URL" />
                    <FormCheck label="Media Recordings" />
                    <FormCheck label="Student Annotation" />
                    <FormCheck label="File Upload" />
                  </div>
            </div>
          </Col>
        </Row>

        <Col xs={12} sm={4}>
        <div className="border rounded p-3">
        <FormGroup controlId="wd-assign-to" className="mb-3">
          <FormLabel>Assign</FormLabel>
          <FormControl
            type="text"
            placeholder={"Everyone"}/>
        
         <Col xs={12} sm={4}>
            <FormGroup controlId="wd-due-date">
              <FormLabel>Due</FormLabel>
              <FormControl
                type="date"
                placeholder={"2024-05-13"}/>
            </FormGroup>
          </Col>

          <Col xs={12} sm={8}>
            <FormLabel>Availability</FormLabel>
            <Row className="g-2">
              <Col xs={6}>
                <FormControl
                  id="wd-available-from"
                  type="date"
                  placeholder={"2024-05-06"}/>
              </Col>
              <Col xs={6}>
                <FormControl
                  id="wd-available-until"
                  type="date"
                  placeholder={"2024-05-20"}/>
              </Col>
            </Row>
          </Col>
        </FormGroup></div></Col><br/>

        <div className="d-flex gap-2">
          <Link href="/Courses/1234/Assignments" className="wd-dashboard-course-link">
            <Button id="wd-cancel" variant="secondary" className="wd-dashboard-course-link">
              Cancel
            </Button>
          </Link>

          <Link href="/Courses/1234/Assignments" className="wd-dashboard-course-link">
          <Button id="wd-save" variant="danger" className="wd-dashboard-course-link">
            Save
          </Button></Link>
        </div>
      </Form>
    </Container>
  );
}