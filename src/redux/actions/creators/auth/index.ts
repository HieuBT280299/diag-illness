import * as AuthActionTypes from "../../types/auth";
import { baseUrl } from "../../../../shared/baseUrl";
import { RegisterDetails } from "../../../../components/pages/SignUp";
import { LoginDetails } from "../../../../components/pages/Login";
import qs from "qs";
import { ProfileDetails } from "../../../../components/pages/Profile";
import { ChangePasswordDetails } from "../../../../components/pages/ChangePassword";

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
      if (response.ok) {
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
        dispatch(signUpFailed(response.message));
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

export const postLogin = (loginDetails: LoginDetails) => (dispatch: any) => {
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
      if (response.ok) {
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
        dispatch(loginFailed(response.message));
      } else {
        // console.log(response);
        const data = response.data;
        const account = { ...data.user, token: data.token };
        console.log(account);
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
    });
};

export const editAccountSuccessfully = (account: any) => {
  return {
    type: AuthActionTypes.EDIT_ACCOUNT_SUCCESSFULLY,
    payload: account,
  };
};

export const editAccountFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.EDIT_ACCOUNT_FAILED,
    payload: errMess,
  };
};

export const putEditAccount = (
  accountDetails: ProfileDetails,
  token: string
) => (dispatch: any) => {
  const data = JSON.stringify(accountDetails);
  console.log(data);
  return fetch(baseUrl + "users", {
    method: "PUT",
    mode: "cors",
    body: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
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
    .then(async (response) => {
      if (response.error) {
        dispatch(editAccountFailed(response.message));
      } else {
        const data = response.data;
        const account = { ...data, token: token };
        console.log(account);
        await dispatch(editAccountSuccessfully(account));
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    })
    .catch((error) => {
      console.log("Edit account ", error.message);
    });
};

export const changePasswordSuccessfully = (message: any) => {
  return {
    type: AuthActionTypes.CHANGE_PASSWORD_SUCCESSFULLY,
    payload: message,
  };
};

export const changePasswordFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.CHANGE_PASSWORD_FAILED,
    payload: errMess,
  };
};

export const postChangePassword = (
  changePasswordDetails: ChangePasswordDetails,
  token: string
) => (dispatch: any) => {
  const data = JSON.stringify(changePasswordDetails);
  console.log(data);
  //TODO
  return fetch(baseUrl + "auth/changePassword", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
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
        dispatch(changePasswordFailed(response.message));
      } else {
        dispatch(changePasswordSuccessfully(response.message));
      }
    })
    .catch((error) => {
      console.log("Login ", error.message);
    });
};

export const getOTPSuccessfully = (message: any) => {
  return {
    type: AuthActionTypes.GET_OTP_SUCCESSFULLY,
    payload: message,
  };
};

export const resetPasswordSuccessfully = (message: any) => {
  return {
    type: AuthActionTypes.RESET_PASSWORD_SUCCESSFULLY,
    payload: message,
  };
};

export const resetPasswordFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.RESET_PASSWORD_FAILED,
    payload: errMess,
  };
};

export const getSendForgotPasswordToken = (email: string) => (
  dispatch: any
) => {
  const params = qs.stringify({ email });
  console.log(params);
  return fetch(`${baseUrl}auth/sendForgotPasswordToken?${params}`, {
    method: "GET",
    mode: "cors",
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
      return response.json();
    })
    .then((response) => {
      if (!response.error) dispatch(getOTPSuccessfully(response.message));
      else dispatch(resetPasswordFailed(response.message));
    })
    .catch((error) => {
      console.log("Send OTP ", error.message);
    });
};
