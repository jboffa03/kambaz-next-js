/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "react-bootstrap";

export default function TrueFalseEditor({question, update,}: 
  {question: any; 
    update: (field: string, value: any) => void;
}) {
  return (
    <div>
      <h6>Correct Answer</h6>
      <Form.Check
        type="radio"
        label="True"
        checked={question.correct === true}
        onChange={() => update("correct", true)}
      />
      <Form.Check
        type="radio"
        label="False"
        checked={question.correct === false}
        onChange={() => update("correct", false)}
      />
    </div>
  );
}