import { combineReducers, configureStore } from "@reduxjs/toolkit";
import isDarkReducer from "./features/isDarkSlice";
import storage from "redux-persist/lib/storage";
import currentUserReducer from "./features/currentUserSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  isDark: isDarkReducer,
  currentUser: currentUserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
