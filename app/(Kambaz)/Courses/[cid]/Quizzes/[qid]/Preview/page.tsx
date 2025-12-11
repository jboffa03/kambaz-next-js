/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../client";
import { setQuestions } from "../Questions/reducer";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [index, setIndex] = useState(0);

  const loadQuestions = async () => {
    const data = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(data));
  };

  useEffect(() => {
    loadQuestions();
  }, [qid]);

  const gradeQuiz = () => {
    let total = 0;

    questions.forEach((question: any) => {
      const userAnswer = answers[question._id];

      if (question.type === "multiple") {
        if (Number(userAnswer) === question.correct) total += question.points;
      }

      if (question.type === "truefalse") {
        if (String(userAnswer) === String(question.correct)) total += question.points;
      }

      if (question.type === "blank") {
        const isCorrect = question.blanks.every((answer: string, i: number) => {
          return (
            userAnswer &&
            userAnswer[i] &&
            userAnswer[i].trim().toLowerCase() === answer.trim().toLowerCase()
          );
        });
        if (isCorrect) total += question.points;
      }
    });

    setScore(total);
  };

  const onSubmit = () => {
    setSubmitted(true);
    gradeQuiz();
  };

  const onReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setIndex(0);
  };

  const next = () => setIndex((i) => Math.min(i + 1, questions.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const jumpTo = (i: number) => setIndex(i);

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[index];
  const userAnswer = answers[question._id];

  const isCorrect =
    submitted &&
    ((question.type === "multiple" && Number(userAnswer) === question.correct) ||
      (question.type === "truefalse" && String(userAnswer) === String(question.correct)) ||
      (question.type === "blank" &&
        question.blanks.every(
          (b: string, i: number) =>
            userAnswer &&
            userAnswer[i] &&
            userAnswer[i].trim().toLowerCase() === b.trim().toLowerCase()
        )));

  return (
    <div className="container mt-3">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quiz Preview</h3>

        {currentUser?.role !== "STUDENT" && (
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)}>
            Edit Quiz
          </Button>
        )}
      </div>

      {submitted && (
        <Alert variant="info">
          <strong>Score: {score}</strong> /{" "}
          {questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0)}
        </Alert>
      )}

      <div className="mb-3 d-flex flex-wrap gap-2">
        {questions.map((_: any, i: number) => (
          <Button
            key={i}
            variant={i === index ? "danger" : "outline-danger"}
            onClick={() => jumpTo(i)}
            size="sm">
            {i + 1}
          </Button>
        ))}
      </div>

      <Card className="mb-4 p-3">
        <h5>
          {index + 1}. {question.title}{" "}
          <span className="text-muted">({question.points} pts)</span>
        </h5>

        <p className="mb-3">{question.text}</p>

        {question.type === "multiple" && (
          <Form>
            {question.choices.map((choice: string, i: number) => (
              <Form.Check
                type="radio"
                key={i}
                label={choice}
                name={question._id}
                value={i}
                disabled={submitted}
                checked={Number(userAnswer) === i}
                onChange={(e) =>
                  setAnswers({ ...answers, [question._id]: Number(e.target.value) })}/>
            ))}
          </Form>
        )}

        {question.type === "truefalse" && (
          <Form>
            <Form.Check
              type="radio"
              name={question._id}
              label="True"
              value="true"
              disabled={submitted}
              checked={String(userAnswer) === "true"}
              onChange={(e) =>
                setAnswers({ ...answers, [question._id]: e.target.value })}/>
            <Form.Check
              type="radio"
              name={question._id}
              label="False"
              value="false"
              disabled={submitted}
              checked={String(userAnswer) === "false"}
              onChange={(e) =>
                setAnswers({ ...answers, [question._id]: e.target.value })}/>
          </Form>
        )}

        {question.type === "blank" && (
          <Form>
            {(question.blanks).map((i: number) => (
              <Form.Group className="mb-2" key={i}>
                <Form.Label>Written Answer</Form.Label>
                <Form.Control
                  disabled={submitted}
                  value={userAnswer?.[i]}
                  onChange={(e) => {
                    const updated = {
                      ...answers,
                      [question._id]: [...(answers[question._id])],
                    };
                    updated[question._id][i] = e.target.value;
                    setAnswers(updated);
                  }}
                />
              </Form.Group>
            ))}
          </Form>
        )}

        {submitted && (
          <Alert variant={isCorrect ? "success" : "danger"} className="mt-3">
            {isCorrect ? "Correct" : "Incorrect"}
          </Alert>
        )}
      </Card>

      <div className="d-flex justify-content-between mb-3">
        <Button variant="secondary" onClick={prev} disabled={index === 0}>
          Previous
        </Button>

        {!submitted && index < questions.length - 1 && (
          <Button variant="danger" onClick={next}>
            Next
          </Button>
        )}

        {!submitted && index === questions.length - 1 && (
          <Button variant="success" onClick={onSubmit}>
            Submit Quiz
          </Button>
        )}
      </div>


      {submitted && currentUser?.role !== "STUDENT" && (
        <div className="d-flex gap-3 mt-3">
          <Button variant="secondary" onClick={onReset}>
            Retake Preview
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`) }>
            Edit Quiz
          </Button>
        </div>
      )}

      {submitted && currentUser?.role === "STUDENT" && (
        <Button variant="secondary" onClick={onReset}>
          Retake Quiz
        </Button>
      )}
    </div>
  );
}
