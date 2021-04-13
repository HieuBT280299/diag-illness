import * as AuthActionTypes from "../../types/auth";
import { baseUrl } from "../../../../shared/baseUrl";
import { RegisterDetails } from "../../../../components/pages/SignUp";

export const signUpSuccessfully = (account: any) => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESSFULLY,
    payload: account,
  };
};

export const signUpFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILED,
    payload: errMess,
  };
};

export const postSignUp = (registerDetails: RegisterDetails) => (
  dispatch: any
) => {
  const data = JSON.stringify(registerDetails);
  console.log(data);
  return fetch(baseUrl + "auth/register", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        throw error;
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.error) {
        dispatch(signUpFailed(response.error));
      } else {
        const account = response.data;
        console.log(account);
        dispatch(signUpSuccessfully(account));
      }
    })
    .catch((error) => {
      console.log("Login ", error.message);
      // dispatch(submitFailed(ERROR_MESSAGE_SUBMIT_GENERAL));
    });
};

export const loginSuccessfully = (account: any) => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESSFULLY,
    payload: account,
  };
};

export const loginFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.LOGIN_FAILED,
    payload: errMess,
  };
};

export const postLogin = (loginDetails: {
  email: string;
  password: string;
}) => (dispatch: any) => {
  const data = JSON.stringify(loginDetails);
  console.log(data);
  return fetch(baseUrl + "auth/login", {
    method: "POST",
    body: data,

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );

        throw error;
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.error) {
        dispatch(loginFailed(response.error));
      } else {
        // console.log(response);
        const data = response.data;
        const account = { ...data.user, token: data.token };
        console.log(account);
        sessionStorage.setItem("account", JSON.stringify(account));
        dispatch(loginSuccessfully(account));
      }
    })
    .catch((error) => {
      console.log("Login ", error.message);
      // dispatch(submitFailed(ERROR_MESSAGE_SUBMIT_GENERAL));
    });
};

export const logoutSuccessfully = (message: any) => {
  return {
    type: AuthActionTypes.LOGOUT_SUCCESSFULLY,
    payload: message,
  };
};

export const getLogout = (token: string) => (dispatch: any) => {
  return fetch(baseUrl + "auth/signout", {
    method: "GET",
    mode: "cors",

    headers: {
      Authorization: token,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );

          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      sessionStorage.removeItem("account");
      return response.json();
    })
    .then(async (response) => {
      await dispatch(logoutSuccessfully(response.message));
      await setTimeout(() => {
        window.location.reload(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Logout ", error.message);
      // dispatch(submitFailed(ERROR_MESSAGE_SUBMIT_GENERAL));
    });
};
