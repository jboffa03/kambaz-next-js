/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    // addAssignment: (state, { payload: assignment }) => {
    //   const newAssignment: any = {
    //     _id: uuidv4(),
    //     ...assignment,
    //   };
    //   state.assignments = [...state.assignments, newAssignment] as any;
    // },

    // deleteAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.filter(a => a._id !== assignmentId);
    // },

    // updateAssignment: (state, { payload: updatedAssignment }) => {
    //   state.assignments = state.assignments.map(a =>
    //     a._id === updatedAssignment._id ? updatedAssignment : a
    //   );
    // },
  },
});

export const { setAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
