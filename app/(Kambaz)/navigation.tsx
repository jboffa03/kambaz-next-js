"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuBookText } from "react-icons/lu";
import { MdOutlineGroup } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { MdOutlineAssignment } from "react-icons/md";

import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  const [activeLink, setActiveLink] = useState<string>("/Dashboard");
 return (
   <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 110 }}
              id="wd-kambaz-navigation">

     <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
       <img src="/images/neu.png" width="75px" alt="Northeastern University" />
     </ListGroupItem><br />
 
     <ListGroupItem className={`border-0 text-center ${activeLink === "/Account" ? "bg-white" : "bg-black"}`}>
        <Link href="/Account" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Account" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Account")}>
          <FaRegCircleUser size={30} className={`fs-1 ${activeLink === "/Account" ? "text-danger" : "text-white"}`}/>
          <br />
          Account
        </Link>
      </ListGroupItem><br/>

    <ListGroupItem className={`border-0 text-center ${activeLink === "/Dashboard" ? "bg-white" : "bg-black"}`}>
        <Link href="/Dashboard" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Dashboard" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Dashboard")}>
          <AiOutlineDashboard size={30} className={`fs-1 ${activeLink === "/Dashboard" ? "text-danger" : "text-white"}`}/>
          <br />
          Dashboard
        </Link>
      </ListGroupItem><br/>

      <ListGroupItem className={`border-0 text-center ${activeLink === "/Courses/1234/Home" ? "bg-white" : "bg-black"}`}>
        <Link href="/Courses/1234/Home" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Courses/1234/Home" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Courses/1234/Home")}>
          <LuBookText size={30} className={`fs-1 ${activeLink === "/Courses/1234/Home" ? "text-danger" : "text-white"}`}/>
          <br />
          Courses
        </Link>
      </ListGroupItem><br/>

    <ListGroupItem className={`border-0 text-center ${activeLink === "/Groups" ? "bg-white" : "bg-black"}`}>
        <Link href="/Groups" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Groups" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Groups")}>
          <MdOutlineGroup size={30} className={`fs-1 ${activeLink === "/Groups" ? "text-danger" : "text-white"}`}/>
          <br />
          Groups
        </Link>
      </ListGroupItem><br/>

    <ListGroupItem className={`border-0 text-center ${activeLink === "/Calendar" ? "bg-white" : "bg-black"}`}>
        <Link href="/Calendar" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Calendar" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Calendar")}>
          <FaRegCalendarAlt size={30} className={`fs-1 ${activeLink === "/Calendar" ? "text-danger" : "text-white"}`}/>
          <br />
          Calendar
        </Link>
      </ListGroupItem><br/>
      
    <ListGroupItem className={`border-0 text-center ${activeLink === "/Inbox" ? "bg-white" : "bg-black"}`}>
        <Link href="/Inbox" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Inbox" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Inbox")}>
          <FiInbox size={30} className={`fs-1 ${activeLink === "/Inbox" ? "text-danger" : "text-white"}`}/>
          <br />
          Inbox
        </Link>
      </ListGroupItem><br/>

    <ListGroupItem className={`border-0 text-center ${activeLink === "/Labs" ? "bg-white" : "bg-black"}`}>
        <Link href="/Labs" id="wd-dashboard-link" 
        className={`text-decoration-none ${activeLink === "/Labs" ? "text-danger" : "text-white"}`}
          onClick={() => setActiveLink("/Labs")}>
          <MdOutlineAssignment size={30} className={`fs-1 ${activeLink === "/Labs" ? "text-danger" : "text-white"}`}/>
          <br />
          Labs
        </Link>
      </ListGroupItem><br/>
   </ListGroup>
);}
