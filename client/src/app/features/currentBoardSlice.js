import { createSlice } from "@reduxjs/toolkit";

const currentBoardSlice = createSlice({
  name: "currentBoard",
  initialState: { value: "" },
  reducers: {
    setCurrentBoard: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setCurrentBoard } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
