"use client";
import React from "react";
import Link from "next/link";
import { FormGroup, FormControl, Col } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Col xs={12} sm={4}>
      <FormGroup className="mb-3" controlId="wd-profile">
        <FormControl type="text" placeholder="alice" />
        <FormControl type="numbers" placeholder="123" />
        <FormControl type="text" placeholder="alice" />
        <FormControl type="text" placeholder="Wonderland" />
        <FormControl type="date" placeholder="2000-01-01" />
        <FormControl type="email" placeholder="alice@wonderland" />
        <FormControl type="text" placeholder="User" /> 
      </FormGroup>
      <Link id="wd-signin-btn"
            href="/Account/Signin"
            className="btn btn-danger w-100 mb-2">
            Sign Out </Link>
      </Col>

      
    </div>
  );
}
