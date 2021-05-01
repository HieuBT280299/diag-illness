import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  ManagePassword,
  LoginAccount,
  RegisterAccount,
} from "../reducers/auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Hospitals } from "../reducers/hospital";
import { Users } from "../reducers/user";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["loginAccount.account"],
// };

const loginConfig = {
  key: "loginAccount",
  storage,
  blacklist: ["errMess"],
};

const rootReducer = combineReducers({
  loginAccount: persistReducer(loginConfig, LoginAccount),
  managePassword: ManagePassword,
  registerAccount: RegisterAccount,
  hospitals: Hospitals,
  users: Users,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const ConfigureStore = () => {
  const store: any = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return { persistor, store };
};
