import { createSlice } from "@reduxjs/toolkit";
import { courses as dbCourses, enrollments as dbEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: dbCourses,
  enrollments: dbEnrollments,   // <-- NEW
  showAllCourses: false,        // <-- NEW
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
      state.enrollments = state.enrollments.filter(
        (e) => e.course !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },

    toggleShowEnrollments: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },

    enrollCourse: (state, { payload: { userId, courseId } }) => {
      const exists = state.enrollments.some(
        (e) => e.user === userId && e.course === courseId
      );
      if (!exists) {
        state.enrollments.push({
          _id: uuidv4(),
          user: userId,
          course: courseId,
        });
      }
    },

    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
    
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    }
  },
});

export const {
  addNewCourse,
  deleteCourse,
  updateCourse,
  toggleShowEnrollments,
  enrollCourse,
  unenrollCourse,
  setCourses,
} = coursesSlice.actions;

export default coursesSlice.reducer;
