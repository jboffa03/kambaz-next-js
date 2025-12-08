import { createSlice } from "@reduxjs/toolkit";
import { courses as dbCourses, enrollments as dbEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: dbCourses,
  enrollments: dbEnrollments, 
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
  },
});

export const {
  setCourses,
  setEnrollments,
} = coursesSlice.actions;

export default coursesSlice.reducer;
