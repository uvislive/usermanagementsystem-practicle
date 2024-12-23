import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // Use session storage
import {thunk} from "redux-thunk";
import authReducer from '../store/slices/authSlice'
// import commonReducer from "./slices/commonSlice";


// Persist config for user
const userPersistConfig = {
  key: "user",
  storage,
};

// Apply persistReducer only to the user reducer
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer, 
  // user: persistedUserReducer, // Persisted reducer
  // common:commonReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid issues with non-serializable data in persistence
    }).concat(thunk),
});

export const persistor = persistStore(store);
