'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles.css";

export default function CourseNavigation() {
  const pathname = usePathname() || "";

  const links = [
    { href: "/Account/Signin", id: "wd-account-signin", label: "Signin" },
    { href: "/Account/Signup", id: "wd-account-signup", label: "Signup" },
    { href: "/Account/Profile", id: "wd-account-profile", label: "Profile" },
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
