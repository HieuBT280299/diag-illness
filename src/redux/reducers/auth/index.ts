import * as AuthActionTypes from "../../actions/types/auth";

const fakeAccount = {
  id: 9,
  createAt: "2021-04-05T07:45:39.000+0000",
  modifyAt: null,
  email: "ngattar1q@gmail.com",
  password: "$2a$10$QZA2oGTQ6JHoLaGJDr/ka.fuGW2qNzYgC.YYfGka08p0ix3ZB7JWS",
  name: "Do Thi Hong Ngat",
  dateOfBirth: "1999-03-03T16:45:58.000+0000",
  gender: 1,
  address: null,
  roleId: 2,
  enabled: 0,
  lastAccess: null,
};

export const LoginAccount = (
  state = {
    account: null,
    errMess: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_FAILED:
      return { ...state, errMess: action.payload };

    case AuthActionTypes.LOGIN_SUCCESSFULLY:
      return { ...state, account: action.payload, errMess: null };

    case AuthActionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, account: null };

    case AuthActionTypes.EDIT_ACCOUNT_SUCCESSFULLY:
      return {
        ...state,
        account: action.payload,
        errMess: null,
      };

    case AuthActionTypes.EDIT_ACCOUNT_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};

export const RegisterAccount = (
  state = {
    registeredAccount: null,
    errMess: null,
    successMessage: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_FAILED:
      return { ...state, errMess: action.payload, successMessage: null };

    case AuthActionTypes.SIGN_UP_SUCCESSFULLY:
      return {
        ...state,
        registeredAccount: action.payload.account,
        errMess: null,
        successMessage: action.payload.successMessage,
      };

    case AuthActionTypes.POST_SIGNUP_TOKEN_FAILED:
      return { ...state, errMess: action.payload, successMessage: null };

    case AuthActionTypes.POST_SIGNUP_TOKEN_SUCCESSFULLY:
      return {
        ...state,
        registeredAccount: action.payload.account,
        errMess: null,
        successMessage: action.payload.successMessage,
      };

    case AuthActionTypes.RESEND_SIGNUP_TOKEN_FAILED:
      return { ...state, errMess: action.payload, successMessage: null };

    case AuthActionTypes.RESEND_SIGNUP_TOKEN_SUCCESSFULLY:
      return {
        ...state,
        errMess: null,
        successMessage: action.payload.successMessage,
      };

    default:
      return state;
  }
};

export const ManagePassword = (
  state = {
    email: null, //for reset password
    successMessage: null,
    errMess: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case AuthActionTypes.SEND_RESET_PASSWORD_TOKEN_FAILED:
      return {
        ...state,
        email: action.payload.email,
        errMess: action.payload.errMess,
        successMessage: null,
      };

    case AuthActionTypes.SEND_RESET_PASSWORD_TOKEN_SUCCESSFULLY:
      return {
        ...state,
        errMess: null,
        email: action.payload.email,
        successMessage: action.payload.successMessage,
      };

    case AuthActionTypes.RESET_PASSWORD_SUCCESSFULLY:
      return { ...state, successMessage: action.payload, errMess: null };

    case AuthActionTypes.RESET_PASSWORD_FAILED:
      return { ...state, successMessage: null, errMess: action.payload };

    case AuthActionTypes.CHANGE_PASSWORD_SUCCESSFULLY:
      return { ...state, successMessage: action.payload, errMess: null };

    case AuthActionTypes.CHANGE_PASSWORD_FAILED:
      return { ...state, account: null, errMess: action.payload };

    default:
      return state;
  }
};
