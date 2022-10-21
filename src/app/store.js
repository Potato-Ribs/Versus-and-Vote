import { configureStore } from "@reduxjs/toolkit";
import isDarkReducer from "./features/isDarkSlice";

const store = configureStore({
  reducer: {
    isDark: isDarkReducer,
  },
});

export default store;
