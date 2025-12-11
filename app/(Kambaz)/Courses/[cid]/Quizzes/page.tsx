/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Dropdown } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCircleXmark, FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import * as client from "../Quizzes/client";
import { setQuizzes } from "../Quizzes/reducer";
import { FaCheckCircle } from "react-icons/fa";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  const [quiz, setQuiz] = useState(
      {
      title: "Quiz Title",
      quizType: "Graded Quiz",
      dueDate: "2024-07-10",
      availableFrom: "2024-06-20",
      availableUntil: "2024-07-10",
      description: "",
      points: 0,
      QuizGroup: "Quizzes",
      shuffle: true,
      timeLimit: 20,
      multipleAttempts: false,
      attemptsAllowed: 1,
      showAnswers: true,
      answerDate: "2024-07-10",
      accessCode: "",
      oneQuestion: true,
      webCam: false,
      lockQuestion: false,
      published: false,
    }
  );

  const onCreateQuizForCourse = async () => {
    if (!cid) return;
    const createdQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(setQuizzes([...quizzes, createdQuiz]));
    router.push(`/Courses/${cid}/Quizzes/${createdQuiz._id}/Details`)
  };

  useEffect(() => {fetchQuizzes();}, []);


  const deleteQuiz = async (quizId: string) => {
    if (!confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };

  const togglePublish = async (quiz: any) => {
    const updated = await client.updateQuiz(quiz._id, {
      published: !quiz.published,});
    dispatch(setQuizzes(quizzes.map((q: any) => (q._id === quiz._id ? updated : q))));
  };

  const courseQuizzes = quizzes.filter((q: any) => q.course === cid);
  const sortedQuizzes = [...courseQuizzes].sort((a: any, b: any) => {
    const aTime = new Date(a.availableFrom).getTime();
    const bTime = new Date(b.availableFrom).getTime();
    return aTime - bTime;
  });


  const availabilityLabel = (quiz: any) => {
    const now = new Date();
    const from = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
    const until = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

    if (from && now < from) {
      return `Not available until ${from.toLocaleString()}`;
    }

    if (until && now > until) {
      return "Closed";
    }

    return "Available";
  };


  return (
    <div>
      {currentUser?.role !== "STUDENT" && (
          <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="fs-3 fw-bold">Quizzes</div>
            <Button variant="danger" onClick={onCreateQuizForCourse}>
            <FaPlus className="me-1" /> Quiz
          </Button></div>
          </>
        )}
      


      <ListGroup>
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> QUIZZES
            </div>

            <IoEllipsisVertical className="fs-4" />
          </div>
        </ListGroupItem>
      </ListGroup>

      <ListGroup>
        {sortedQuizzes.length === 0 && (
          <div className="text-muted ms-2 mt-2">
            No quizzes yet. Click <b>+ Quiz</b> to create one.
          </div>
        )}

        {sortedQuizzes.map((quiz: any) => (
          <ListGroupItem
            key={quiz._id}
            className="d-flex justify-content-between align-items-start">
            <Link
              href={`/Courses/${cid}/Quizzes/${quiz._id}/Details`}
              className="text-decoration-none text-dark"
              style={{ flexGrow: 1 }}>
              <BsGripVertical className="me-2 fs-3" />

              <span
                onClick={(e) => {
                  e.preventDefault();
                  togglePublish(quiz);}}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",}}>
                {quiz.published ? <FaCheckCircle /> : <FaCircleXmark />}
              </span>

              {quiz.title}

              <br />
              <div className="d-inline-block ms-5 fs-6 text-muted">
                <b>{availabilityLabel(quiz)}</b> |
                <b> Due:</b> {quiz.dueDate || "TBD"} |
                <b> Points:</b> {quiz.points ?? 0} |
                <b> Questions:</b> {quiz.questions ?? 0}
                {currentUser?.role === "STUDENT" && (
                  <>
                    {" | "}
                    <b>Score:</b> {quiz.lastScore ?? "—"}
                  </>
                )}
              </div>
            </Link>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-secondary"
                size="sm"
                className="border-0">
                <IoEllipsisVertical />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Editor`)}>
                  Edit
                </Dropdown.Item>

                <Dropdown.Item onClick={() => deleteQuiz(quiz._id)}>
                  Delete
                </Dropdown.Item>

                <Dropdown.Item onClick={() => togglePublish(quiz)}>
                  {quiz.published ? "Unpublish" : "Publish"}
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
