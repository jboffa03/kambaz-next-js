/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form } from "react-bootstrap";
import { HiMiniXMark } from "react-icons/hi2";

export default function MultipleChoiceEditor({ question, update, }: {
  question: any;
  update: (field: string, value: any) => void;
}) {
  const updateChoice = (answer: number, value: string) => {
    const choices = [...(question.choices)];
    choices[answer] = value;
    update("choices", choices);
  };

  const addChoice = () => update("choices", [...(question.choices), "New Choice"]);

  const removeChoice = (answer: number) =>
    update(
      "choices",
      (question.choices).filter((value: number) => value !== answer)
    );

  return (
    <div>
      <h6>Choices</h6>
      {(question.choices).map((choice: string, answer: number) => (
        <div key={answer} className="d-flex align-items-center mb-2">
          <Form.Check
            type="radio"
            className="me-2"
            checked={question.correct === answer}
            onChange={() => update("correct", answer)}
          />
          <Form.Control value={choice} onChange={(e) => updateChoice(answer, e.target.value)} className="me-2" />
          <Button size="sm" variant="outline-danger" onClick={() => removeChoice(answer)}>
            <HiMiniXMark />
          </Button>
        </div>
      ))}

      <div className="mt-2">
        <Button size="sm" onClick={addChoice}>
          + Add Choice
        </Button>
      </div>
    </div>
  );
}
