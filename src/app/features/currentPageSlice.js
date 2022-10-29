import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: { value: "" },
  reducers: {
    setCurrentPage: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
