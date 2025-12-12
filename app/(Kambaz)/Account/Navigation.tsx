/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";


export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile", "Users"] : ["Signin", "Signup"];
 const pathname = usePathname();
 
 return (
   <Nav variant="pills">
    {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}
     {links.map((link) => (
       <NavItem key={link}>
         <NavLink as={Link} href={link} active={pathname.endsWith(link.toLowerCase())}>
           {link} </NavLink> </NavItem>
     ))}
   </Nav>
);}
