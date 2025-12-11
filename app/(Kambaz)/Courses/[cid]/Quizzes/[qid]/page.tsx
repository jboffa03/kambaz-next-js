// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Button, ListGroup } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import * as client from "../client"; 
// import { setQuestions } from "./Questions/reducer";

// export default function QuestionsList() {
//   const { cid, qid } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { questions } = useSelector((state: any) => state.questionsReducer);


//   const fetchQuestions = async () => {
//     const data = await client.findQuestionsForQuiz(qid as string);
//     dispatch(setQuestions(data));
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, [qid]);

//   const createQuestion = async () => {
//     const created = await client.createQuestion(qid as string, {
//       quiz: qid,
//       title: "New Question",
//       type: "multiple",
//       points: 1,
//       text: "",
//       choices: ["Choice 1", "Choice 2"],
//       correct: 0,
//       blanks: [],
//     });

//     await fetchQuestions();
//     router.push(`/Courses/${cid}/Quizzes/${qid}/Questions/${created._id}/Editing`);
//   };

//   const totalPoints = (questions || [])
//     .filter((q: any) => q.quiz === qid)
//     .reduce((sum: number, q: any) => sum + (q.points || 0), 0);

//   const quizQuestions = (questions || []).filter((q: any) => q.quiz === qid);

//   return (
//     <div className="container mt-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3>Questions</h3>
//         <div>
//           <Button variant="outline-secondary" className="me-2" onClick={() => fetchQuestions()}>
//             Refresh
//           </Button>
//           <Button onClick={createQuestion}>+ New Question</Button>
//         </div>
//       </div>

//       <p className="text-muted">Total Points: {totalPoints}</p>

//       {quizQuestions.length === 0 && <div>No questions yet. Click “New Question” to add one.</div>}

//       <ListGroup>
//         {quizQuestions.map((q: any) => (
//           <ListGroup.Item key={q._id} className="d-flex justify-content-between align-items-center">
//             <div>
//               <strong>{q.title || "(Untitled)"}</strong> — {q.type} — {q.points ?? 0} pts
//             </div>

//             <div className="d-flex gap-2">
//               <Link
//                 href={`/Courses/${cid}/Quizzes/${qid}/Questions/${q._id}/Preview`}
//                 className="btn btn-outline-secondary btn-sm"
//               >
//                 Preview
//               </Link>

//               <Link
//                 href={`/Courses/${cid}/Quizzes/${qid}/Questions/${q._id}/Editing`}
//                 className="btn btn-primary btn-sm"
//               >
//                 Edit
//               </Link>
//             </div>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }
