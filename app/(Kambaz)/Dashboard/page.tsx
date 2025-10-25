/* eslint-disable react/jsx-key */
import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/webdev.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);}


//  <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 2 */}
//         <Card>
//         <Link href="/Courses/3450/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/va.jpg" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">COMM3450 Voice Over</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             Recording and Voice Over</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col>

//       <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 3 */}
//         <Card>
//         <Link href="/Courses/4550/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/webdev.jpg" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4550 Web Dev</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             Developing for the Web</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col>
      
//       <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 4 */}
//         <Card>
//         <Link href="/Courses/1110/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/games.jpg" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">GAME1110 G&S</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             Games and Society</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col>

//       <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 5 */}
//         <Card>
//         <Link href="/Courses/3601/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/dsp.webp" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">MUST3601 DSP</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             Digital Audio Signal Processing</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col>

//       <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 6 */}
//         <Card>
//         <Link href="/Courses/4530/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/swe.jpg" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4530 SWE</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             Fundamentals of Software Engineering</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col>

//       <Col className="wd-dashboard-course" style={{ width: "270px" }}>  {/* Course 7 */}
//         <Card>
//         <Link href="/Courses/3973/Home"
//               className="wd-dashboard-course-link text-decoration-none text-dark">
//           <CardImg variant="top" src="/images/aimusic.jpg" width="100%" height={150}/>
//           <CardBody>
//           <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">MUST3973 AI in Music</CardTitle>
//           <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
//             AI for Musical Innovation</CardText>
//           <Button variant="primary">Go</Button>
//           </CardBody>
//         </Link>
//         </Card>
//       </Col> 