'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles.css";

export default function CourseNavigation() {
  const pathname = usePathname() || "";

  const links = [
    { href: "/Courses/1234/Home", id: "wd-course-home-link", label: "Home" },
    { href: "/Courses/1234/Modules", id: "wd-course-modules-link", label: "Modules" },
    { href: "/Courses/1234/Piazza", id: "wd-course-piazza-link", label: "Piazza" },
    { href: "/Courses/1234/Zoom", id: "wd-course-zoom-link", label: "Zoom" },
    { href: "/Courses/1234/Assignments", id: "wd-course-assignments-link", label: "Assignments" },
    { href: "/Courses/1234/Quizzes", id: "wd-course-quizzes-link", label: "Quizzes" },
    { href: "/Courses/1234/People/Table", id: "wd-course-people-link", label: "People" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href);
        const className = `list-group-item ${isActive ? "active" : "text-danger"} border-0`;
        return (
          <Link key={link.href} href={link.href} id={link.id} className={className}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
