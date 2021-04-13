import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { LoginAccount } from "../reducers/auth";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ loginAccount: LoginAccount }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
