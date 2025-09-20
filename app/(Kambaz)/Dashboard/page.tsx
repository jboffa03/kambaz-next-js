import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          {" "}
          {/* Course 1 */}
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course 2 */}
          <Link href="/Courses/3450" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> COMM3450 Voice Over </h5>
              <p className="wd-dashboard-course-title">Voice Over</p>
              <button> Go </button>
              <br />
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course 3 */}
          <Link href="/Courses/4550" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">Web Dev</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course 4 */}
          <Link href="/Courses/1110" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> GAME1110 Games and Society </h5>
              <p className="wd-dashboard-course-title">Games and Society</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course 5 */}
          <Link href="/Courses/3601" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> MUST3601 Digital Audio Signal Processing </h5>
              <p className="wd-dashboard-course-title">DSP</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course 6 */}
          <Link href="/Courses/4530" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS4530 Fundamentals of Software Engineering </h5>
              <p className="wd-dashboard-course-title">Software Engineering</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          {" "}
          {/* Course  7*/}
          <Link href="/Courses/3973" className="wd-dashboard-course-link">
            <Image
              src="/images/notebook.webp"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> MUST3973 AI for Musical Innovation </h5>
              <p className="wd-dashboard-course-title">AI in Music</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
