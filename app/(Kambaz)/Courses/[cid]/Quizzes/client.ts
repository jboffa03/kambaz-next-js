/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSE_API = `${HTTP_SERVER}/api/courses`;
const QUIZ_API = `${HTTP_SERVER}/api/quizzes`;
const QUESTION_API = `${HTTP_SERVER}/api/questions`;

export const fetchQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSE_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(`${COURSE_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}`, quiz);
  return response.data;
};

export const getQuizAttemptInfo = async (quizId: string, studentId: string) => {
  const response = await axiosWithCredentials.get(`/api/quizzes/${quizId}/attempts/${studentId}`);
  return response.data();
};

export const submitQuizAttempt = async ( quizId: string, studentId: string, answers: any[] ) => {
  const response = await axiosWithCredentials.post(`/api/quizzes/${quizId}/attempts/${studentId}`, {body: JSON.stringify({ answers })});
  return response.data();
};

export const findQuestionsForQuiz = async (qid: string) => {
  const response = await axios.get(`${QUIZ_API}/${qid}/questions`);
  return response.data;
}

export const createQuestion = async (qid: string, question: any) => {
  const response = await axiosWithCredentials.post(`${QUIZ_API}/${qid}/questions`, question);
  return response.data;
}

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axiosWithCredentials.put(`${QUESTION_API}/${questionId}`, question);
  return response.data;
}

export const findQuestionById = async (quid: string) => {
  const res = await axios.get(`${QUESTION_API}/${quid}`);
  return res.data;
};

