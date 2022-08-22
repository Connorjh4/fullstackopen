import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

//reducers
import blogReducer from "./blogReducer";
import notifyReducer from "./notifyReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notify: notifyReducer,
  loggedUser: loginReducer
})

const persistConfig = {
  key:'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});


