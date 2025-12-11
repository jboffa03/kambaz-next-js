import { createSlice } from "@reduxjs/toolkit";

const initialState = { attemptInfo : [] };

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttemptInfo(state, action) {
      state.attemptInfo = action.payload;
    },
  },
});

export const { setAttemptInfo } = attemptsSlice.actions;
export default attemptsSlice.reducer;
