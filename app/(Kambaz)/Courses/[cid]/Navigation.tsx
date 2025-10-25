'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles.css";
import { ListGroupItem } from "react-bootstrap";


export default function CourseNavigation() {
  const pathname = usePathname();
  const courseIdFromPath = pathname.split('/')[2]; 
  
  const links = [
    {label: "Home", path: `/Courses/${courseIdFromPath}/Home`},
    {label: "Modules", path: `/Courses/${courseIdFromPath}/Modules`},
    {label: "Piazza", path: `https://piazza.com`},
    {label: "Zoom", path: `https://zoom.us`},
    {label: "Assignments", path: `/Courses/${courseIdFromPath}/Assignments`},
    {label: "Quizzes", path: `/Courses/${courseIdFromPath}/Quizzes`},
    {label: "Grades", path: `/Courses/${courseIdFromPath}/Grades`},
    {label: "People", path: `/Courses/${courseIdFromPath}/People/Table`},
  ];
 
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <ListGroupItem key={link.path} as={Link} href={link.path}
          className={`bg-white text-center border-0
              ${pathname.includes(link.label) ? "text-black" : "text-danger bg-black"}`}>
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </div>
  );
}
