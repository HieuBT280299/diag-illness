import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { ManagePassword, LoginAccount } from "../reducers/auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["managePassword"],
};

const rootReducer = combineReducers({
  loginAccount: LoginAccount,
  managePassword: ManagePassword,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const ConfigureStore = () => {
  const store: any = createStore(
    persistedReducer,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
