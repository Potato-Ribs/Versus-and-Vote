import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoURL: "",
  displayName: "",
  newPhoto: "",
};

const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    getCurrentUser: (state, actions) => {
      state.photoURL = actions.payload.photoURL;
      state.displayName = actions.payload.displayName;
      state.newPhoto = actions.payload.newPhoto;
    },
  },
});

export const { getCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
