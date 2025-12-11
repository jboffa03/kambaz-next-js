/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form } from "react-bootstrap";
import { HiMiniXMark } from "react-icons/hi2";

export default function FillBlankEditor({question, update, }:
  { question: any; 
    update: (field: string, value: any) => void; }) {
  
    const updateBlank = (answers: number, value: string) => {
    const blanks = [...(question.blanks)];
    blanks[answers] = value;
    update("blanks", blanks);
  };

  const addBlank = () => update("blanks", [...(question.blanks), ""]);

  const removeBlank = (answers: number) =>
    update("blanks", (question.blanks).filter((value: number) => value !== answers));

  return (
    <div>
      <h6>Acceptable Answers</h6>
      {(question.blanks).map((blank: string, answers: number) => (
        <div key={answers} className="d-flex gap-2 mb-2">
          <Form.Control value={blank} onChange={(e) => updateBlank(answers, e.target.value)} />
          <Button size="sm" variant="outline-danger" onClick={() => removeBlank(answers)}>
            <HiMiniXMark />
          </Button>
        </div>
      ))}
      <div className="mt-2">
        <Button size="sm" onClick={addBlank}>
          + Add Answer
        </Button>
      </div>
    </div>
  );
}
