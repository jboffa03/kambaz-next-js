/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; 
import { Button, ListGroup, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";
import { setQuestions } from "../Questions/reducer"

export default function QuestionsList() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { questions } = useSelector((state: any) => state.questionsReducer);  

  const fetchQuestion = async () => {
    const data = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(data));
  };


  const [question, setQuestion] = useState(
    {
      quiz: qid,
      title: "New Question",
      type: "multiple",
      points: 1,
      text: "",
      choices: ["Choice 1", "Choice 2"],
      correct: 0,
      blanks: [],
    }
  )


  const onCreateQuestionForQuiz = async () => {
        if (!qid) return;
        const createdQuestion = await client.createQuestion(qid as string, question);
        dispatch(setQuestions([...questions, createdQuestion]));
        router.push(`/Courses/${cid}/Quizzes/${qid}/Questions/${createdQuestion._id}/Editing`)
      };
      

  useEffect(() => {fetchQuestion();}, [qid]);

  const totalPoints = (questions)
    .filter((q: any) => q.quiz === qid)
    .reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  const quizQuestions = questions.filter((q: any) => q.quiz === qid);

  const activeTab = "questions";

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Questions</h3>
          <Nav variant="tabs" activeKey={activeTab} className="mb-4">
        <Nav.Item>
          <Nav.Link
            eventKey="details"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Details`)}>
            Details
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="questions"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>


        <div className="d-flex gap-2 mb-4">
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
            Preview</Button>
          <Button variant="primary" onClick={onCreateQuestionForQuiz}>+ New Question</Button>
        </div>
      </div>

      <p className="text-muted">Total Points: {totalPoints}</p>

      {quizQuestions.length === 0 && <div>No questions yet. Click “New Question” to add one.</div>}

      <ListGroup>
        {quizQuestions.map((q: any) => (
          <ListGroup.Item key={q._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{q.title || "(Untitled)"}</strong> — {q.type} — {q.points ?? 0} pts
            </div>

            <div className="d-flex gap-2">
              <Link
                href={`/Courses/${cid}/Quizzes/${qid}/Questions/${q._id}/Editing`}
                className="btn btn-primary btn-sm">
                Edit
              </Link>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
