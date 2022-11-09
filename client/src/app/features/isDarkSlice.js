import { createSlice } from "@reduxjs/toolkit";

const isDarkSlice = createSlice({
  name: "isDarkSlice",
  initialState: { value: true },
  reducers: {
    click: (state) => {
      state.value = !state.value;
    },
  },
});

export const { click } = isDarkSlice.actions;

export default isDarkSlice.reducer;
