import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function ModulesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>

    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button>

   </div>
);}
