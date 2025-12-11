/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Button, Nav, FormCheck } from "react-bootstrap"; 
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "../../reducer";
import * as client from "../../client";
import { ParamValue } from "next/dist/server/request/params";


export default function QuizDetail() {
  const { cid, qid} = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const isNew = qid === "new";
  const activeTab = "details";

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const dbQuiz = quizzes.find((a: { _id: ParamValue }) => a._id === qid);

  const [quiz, setQuiz] = useState(
    dbQuiz || {
      title: "Quiz Title",
      quizType: "Graded Quiz",
      dueDate: "2024-07-10",
      availableFrom: "2024-06-20",
      availableUntil: "2024-07-10",
      description: "",
      points: 0,
      QuizGroup: "Quizzes",
      shuffleAnswers: true,
      haveTimeLimit: true,
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

  const fetchQuizzes = async () => {
      const data = await client.fetchQuiz(qid as string);
      dispatch(setQuizzes(data));
    };

  useEffect(() => {fetchQuizzes();}, []);
  
  // const onCreateQuizForCourse = async (Quiz: any) => {
  //   if (!cid) return;
  //   const createdQuiz = await client.createQuiz(cid as string, Quiz);
  //   dispatch(setQuizzes([...quizzes, createdQuiz]));
  // };

  const onUpdateQuiz = async (Quiz: any) => {
    await client.updateQuiz(qid as string, Quiz);
    const newQuiz = quizzes.map((q: any) =>
      q._id === Quiz._id ? Quiz : q
    );
    dispatch(setQuizzes(newQuiz));
  };

  const onDeleteQuiz = async (quizId: string) => {
      await client.deleteQuiz(qid as string);
      dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
    };

  const update = (field: string, value: any) =>
    setQuiz({ ...quiz, [field]: value });

  if (!quiz) return <div>Loading...</div>;


  const save = () => {
    onUpdateQuiz(quiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}/Details`);
  };

  const saveAndPublish = () => {
    const publishedQuiz = { ...quiz, published: true };
    onUpdateQuiz(publishedQuiz);

    router.push(`/Courses/${cid}/Quizzes`);
  };

  const cancel = () => {
    onDeleteQuiz(quiz._id);
    router.push(`/Courses/${cid}/Quizzes`);
  }

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

        <Button variant="primary" size="lg">
          Start Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
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

      {activeTab === "details" && (
        <>
          <h2 className="mb-4">Quiz Editor</h2>

          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control value={quiz.description} onChange={(e) => update("description", e.target.value)} />
              
            </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Quiz Type</b></Form.Label>
          <Form.Select
            value={quiz.type || "Graded Quiz"}
            onChange={(e) =>
              setQuiz({ ...quiz, type: e.target.value })}>
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Points</b></Form.Label>
          <Form.Control
            type="number"
            value={quiz.points ?? 0}
            onChange={(e) =>
              setQuiz({ ...quiz, points: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Quiz Group</b></Form.Label>
          <Form.Select
            value={quiz.QuizGroup || "Quizzes"}
            onChange={(e) =>
              setQuiz({ ...quiz, QuizGroup: e.target.value })}>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Shuffle Answers</b></Form.Label>
          <FormCheck 
          type="switch" 
          checked={quiz.shuffleAnswers} 
          label={quiz.shuffleAnswers ? "Yes" : "No"}
          onChange={(e: any) =>  setQuiz({ ...quiz, shuffleAnswers: e.target.checked})}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Time Limit (minutes)</b></Form.Label>
          <FormCheck 
          type="switch" 
          checked={quiz.haveTimeLimit || false} 
          label={quiz.haveTimeLimit ? "Yes" : "No"}
          onChange={(e: any) =>  setQuiz({ ...quiz, haveTimeLimit: e.target.checked})}/>
        </Form.Group>

        {quiz.haveTimeLimit && (
          <Form.Group className="mb-3">
            <Form.Label><b>Available Time</b></Form.Label>
            <Form.Control
            type="number"
            value={quiz.timeLimit ?? 20}
            onChange={(e) =>
              setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}/>
          </Form.Group>
        )}
          
          
        <Form.Group className="mb-3">
          <Form.Label><b>Multiple Attempts</b></Form.Label>
          <FormCheck 
          type="switch" 
          checked={quiz.multipleAttempts} 
          label={quiz.multipleAttempts ? "Yes" : "No"}
          onChange={(e: any) =>  setQuiz({ ...quiz, multipleAttempts: e.target.checked})}/>
        </Form.Group>

        {quiz.multipleAttempts && (
          <Form.Group className="mb-3">
            <Form.Label><b>How Many Attempts</b></Form.Label>
            <Form.Control
              type="number"
              value={quiz.attemptsAllowed ?? 1}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  attemptsAllowed: Number(e.target.value),})}/>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label><b>Show Correct Answers</b></Form.Label>
          <Form.Select
            value={quiz.showAnswers ? "Yes" : "No"}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                showAnswers: e.target.value === "Yes",})}>
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Form.Group>

        {quiz.showAnswers && (
          <Form.Group className="mb-3">
            <Form.Label><b>Answers Revealed</b></Form.Label>
            <Form.Control
              type="datetime-local"
                value={quiz.answerDate || ""}
                onChange={(e) =>
                setQuiz({ ...quiz, answerDate: e.target.value })
                }/>
          </Form.Group>
        )}


        <Form.Group className="mb-3">
          <Form.Label><b>Access Code</b></Form.Label>
          <Form.Control
            type="text"
            placeholder="Optional"
            value={quiz.accessCode || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, accessCode: e.target.value })}/>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label><b>One Question at a Time</b></Form.Label>
          <Form.Select
            value={quiz.oneQuestionAtATime ? "Yes" : "No"}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                oneQuestionAtATime: e.target.value === "Yes",})}>
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Webcam Required</b></Form.Label>
          <Form.Select
            value={quiz.webcamRequired ? "Yes" : "No"}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                webcamRequired: e.target.value === "Yes",})}>
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Lock Questions After Answering</b></Form.Label>
          <Form.Select
            value={quiz.lockAfterAnswering ? "Yes" : "No"}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                lockAfterAnswering: e.target.value === "Yes",})}>
            <option>No</option>
            <option>Yes</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Due Date</b></Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.dueDate || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, dueDate: e.target.value })}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Available From</b></Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.availableFrom || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, availableFrom: e.target.value })}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><b>Available Until</b></Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.availableUntil || ""}
            onChange={(e) =>
              setQuiz({ ...quiz, availableUntil: e.target.value })}/>
        </Form.Group>

        <div className="d-flex gap-2 mt-4">

            <Button variant="secondary" onClick={cancel}>
            Cancel
            </Button>

            <Button variant="primary" onClick={save}>
            Save
            </Button>

            <Button variant="success" onClick={saveAndPublish}>
            Save & Publish
            </Button>

            </div>
          </Form>
        </>
      )}
    </div>
  );
}