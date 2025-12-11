import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import questionsReducer from "./Courses/[cid]/Quizzes/[qid]/Questions/reducer";
import attemptReducer from "./Courses/[cid]/Quizzes/[qid]/Preview/reducer";

const store = configureStore({
 reducer: { coursesReducer, modulesReducer , accountReducer, assignmentsReducer, quizzesReducer, questionsReducer, attemptReducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;

