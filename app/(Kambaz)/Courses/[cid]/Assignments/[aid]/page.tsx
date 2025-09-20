import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
          <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr><br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option selected value="ASSIGNMENTS" >ASSIGNMENTS</option>
              <option value="LABS">LABS</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </td>
        </tr><br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option selected value="Percentage" >Percentage</option>
              <option value="Points">Points</option>
            </select>
          </td>
        </tr><br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option selected value="Online" >Online</option>
              <option value="In Person">In Person</option>
            </select>
          </td>
        </tr><br/>

        <tr>
          <td align="left" valign="top">
            <label htmlFor="wd-text-entry">Online Entry Options</label>
          </td>
          </tr>
        <input type="checkbox" name="check-text-entry" id="wd-text-entry"/>
        <label htmlFor="wd-text-entry">Text Entry</label><br/>

        <input type="checkbox" name="check-text-entry" id="wd-website-url"/>
        <label htmlFor="wd-website-url">Website URL</label><br/>

        <input type="checkbox" name="check-text-entry" id="wd-media-recordings"/>
        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

        <input type="checkbox" name="check-text-entry" id="wd-student-annotation"/>
        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

        <input type="checkbox" name="check-text-entry" id="wd-file-upload"/>
        <label htmlFor="wd-file-upload">File Upload</label><br/><br/>

        <tr>
          <td align="left" valign="top">
          <label htmlFor="wd-assign-to">Assign to</label>
          </td></tr>
        <tr>  
          <td align="left" valign="top">
            <input id="wd-assign-to" value={"Everyone"} />
          </td></tr><br/>

        <label htmlFor="wd-due-date"> Due </label><br/>
          <input type="date"
                value="2024-05-13"
                id="wd-due-date"/><br/><br/>

        <label htmlFor="wd-available-from"> Available from </label>
        <label htmlFor="wd-available-until" style={{ marginLeft: "12px" }}> Until </label><br/>
          <input type="date"
                value="2024-05-06"
                id="wd-available-from"/>
          <input type="date"
                value="2024-05-20"
                id="wd-available-until"/><br/>
        
        <br/>
        <Link href="/Courses/1234/Assignments" className="wd-dashboard-course-link">
        <button id="wd-cancel">Cancel</button>
        <button id="wd-save">Save</button>
        </Link>
      </table>
    </div>
);}
