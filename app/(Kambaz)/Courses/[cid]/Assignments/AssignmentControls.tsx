'use client';

import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";


export default function AssignmentControls() {
 const { cid } = useParams();
  const router = useRouter();
  const newAssign = () => {
    const path = `/Courses/${cid}/Assignments/new`;
    router.push(path);
  };


 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn" onClick={newAssign}>
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>

    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button>
   </div>
);}
