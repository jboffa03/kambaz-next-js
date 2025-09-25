import Link from "next/link";
import { Col, Form } from "react-bootstrap";
export default function Signin() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <Col md={6} lg={4} className="p-0">
      <Form.Control id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <Form.Control id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Link id="wd-signin-btn"
            href="/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign in </Link>
      <Link id="wd-signup-link" href="/Account/Signin">Signin</Link></Col>
    </div> );}