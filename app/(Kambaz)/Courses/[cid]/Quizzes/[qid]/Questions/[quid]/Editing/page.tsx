/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import * as client from "../../../../client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";
import { ParamValue } from "next/dist/server/request/params";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../../reducer";

export default function QuestionEditing() {
  const { cid, qid, quid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const isNew = quid === "new";
  const dbQuestion = questions.find((qu: { _id: ParamValue; }) => qu._id === quid);

  const [form, setForm] = useState(dbQuestion || {
      quiz: qid,
      title: "New Question",
      type: "multiple",
      points: 1,
      text: "",
      choices: ["Choice 1", "Choice 2"],
      correct: 0,
      blanks: [],
    });
 

  const onCreateQuestionForQuiz = async (question: any) => {
          if (!qid) return;
          const createdQuestion = await client.createQuestion(qid as string, question);
          dispatch(setQuestions([...questions, createdQuestion]));
          router.push(`/Courses/${cid}/Quizzes/${qid}/Questions/${createdQuestion._id}/Editing`)
        };

  const onUpdateQuestion = async (question: any) => {
        await client.updateQuestion(quid as string, question);
        const newQuestion = questions.map((qu: any) => qu._id === question._id ? question : qu );
        dispatch(setQuestions(newQuestion));
      };

  const update = (field: string, value: any) =>
    setForm({ ...form, [field]: value });

  const save = () => {
    if (isNew) onCreateQuestionForQuiz(form);
     else onUpdateQuestion(form);
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  const cancel = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Edit Question</h3>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
            Preview
          </Button>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Save
          </Button>
        </div>
      </div>

      <Card className="p-3">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={form.title} onChange={(e) => update("title", e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={form.points} onChange={(e) => update("points", Number(e.target.value))} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question Text</Form.Label>
          <Form.Control as="textarea" rows={4} value={form.text} onChange={(e) => update("text", e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question Type</Form.Label>
          <Form.Select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="multiple">Multiple Choice</option>
            <option value="truefalse">True / False</option>
            <option value="blank">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>

        {form.type === "multiple" && <MultipleChoiceEditor question={form} update={update} />}
        {form.type === "truefalse" && <TrueFalseEditor question={form} update={update} />}
        {form.type === "blank" && <FillBlankEditor question={form} update={update} />}
      </Card>
    </div>
  );
}

