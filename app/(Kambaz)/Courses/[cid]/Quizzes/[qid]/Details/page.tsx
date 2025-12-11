/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "../../client";
import { ParamValue } from "next/dist/server/request/params";

export default function QuizDetailSummary() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const dbQuiz =  quizzes.find((a: { _id: ParamValue; }) => a._id === qid);

    const [quiz, setQuiz] = useState(dbQuiz);

    const fetchQuiz = async (quizId: any) => {
        const data = await client.findQuizzesForCourse(qid as string);
        const quizById = data.filter((q: any) => q._id !== quizId);
        setQuiz({...quiz, quizById});
    };

    useEffect(() => {
        fetchQuiz(qid);
    }, []);

  if (!quiz) return <div>Loading...</div>;


  if (currentUser?.role === "STUDENT") {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>

        <div className="text-muted mb-3">
          <b>Points:</b> {quiz.points ?? 0} <br />
          <b>Due:</b> {quiz.dueDate || "TBD"} <br />
          <b>Available From:</b> {quiz.availableFrom || "TBD"} <br />
          <b>Available Until:</b> {quiz.availableUntil || "TBD"}
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
          Start Quiz
        </Button>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">{quiz.title}</h2>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
          Preview
        </Button>

        <Button
          variant="primary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Editor`)}>
          Edit
        </Button>
      </div>

      <ListGroup>
        <ListGroup.Item>
          <b>Quiz Title:</b> {quiz.title || "Quiz"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Quiz Type:</b> {quiz.type || "Graded Quiz"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Points:</b> {quiz.points ?? 0}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Assignment Group:</b> {quiz.assignmentGroup || "Quizzes"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Shuffle Answers:</b>{" "}
          {quiz.shuffleAnswers ? "Yes" : "No"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Time Limit:</b> {quiz.haveTimeLimit ? "Yes" : "No"}
          {quiz.haveTimeLimit && (
            <> (Time Limit(min): {quiz.timeLimit ?? 20})</>)}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Multiple Attempts:</b>{" "}
          {quiz.multipleAttempts ? "Yes" : "No"}
          {quiz.multipleAttempts && (
            <> (Attempts allowed: {quiz.attemptsAllowed ?? 1})</>)}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Show Correct Answers:</b>{" "}
          {quiz.showCorrectAnswers || "Not set"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Access Code:</b>{" "}
          {quiz.accessCode ? quiz.accessCode : "None"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>One Question at a Time:</b>{" "}
          {quiz.oneQuestionAtATime ? "Yes" : "No"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Webcam Required:</b>{" "}
          {quiz.webcamRequired ? "Yes" : "No"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Lock Questions After Answering:</b>{" "}
          {quiz.lockAfterAnswering ? "Yes" : "No"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Due Date:</b> {quiz.dueDate || "TBD"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Available From:</b> {quiz.availableFrom || "TBD"}
        </ListGroup.Item>

        <ListGroup.Item>
          <b>Available Until:</b> {quiz.availableUntil || "TBD"}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
