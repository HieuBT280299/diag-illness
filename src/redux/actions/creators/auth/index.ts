import * as AuthActionTypes from "../../types/auth";
import { baseUrl } from "../../../../shared/baseUrl";
import { RegisterDetails } from "../../../../components/pages/SignUp/SignUpForm";
import { LoginDetails } from "../../../../components/pages/Login";
import qs from "qs";
import { ProfileDetails } from "../../../../components/pages/Profile";
import { ChangePasswordDetails } from "../../../../components/pages/ChangePassword";
import { ResetPasswordDetails } from "../../../../components/pages/ForgotPassword/TokenForm";

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

export const postSignUp = (
  registerDetails: RegisterDetails,
  callback: () => void
) => (dispatch: any) => {
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
        const payload = {
          account: response.data,
          successMessage: response.message,
        };
        console.log(payload);
        dispatch(signUpSuccessfully(payload));
        callback();
      }
    })
    .catch((error) => {
      console.log("Register ", error.message);
    });
};

export const confirmSignUpSuccessfully = (account: any) => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESSFULLY,
    payload: account,
  };
};

export const confirmSignUpFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILED,
    payload: errMess,
  };
};

export const postConfirmSignUp = (
  email: string,
  token: string,
  callback: () => void
) => (dispatch: any) => {
  const data = JSON.stringify({ email, token });
  console.log(data);
  return fetch(baseUrl + "auth/confirm", {
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
        dispatch(confirmSignUpFailed(response.message));
      } else {
        const payload = {
          account: response.data,
          successMessage: response.message,
        };
        console.log(payload);
        dispatch(confirmSignUpSuccessfully(payload));
        callback();
      }
    })
    .catch((error) => {
      console.log("Register ", error.message);
    });
};

export const resendTokenSignUpSuccessfully = (successMessage: any) => {
  return {
    type: AuthActionTypes.RESEND_SIGNUP_TOKEN_SUCCESSFULLY,
    payload: successMessage,
  };
};

export const resendTokenSignUpFailed = (errMess: any) => {
  return {
    type: AuthActionTypes.RESEND_SIGNUP_TOKEN_FAILED,
    payload: errMess,
  };
};

export const resendTokenSignUp = (email: string, callback: () => void) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}auth/sendConfirmToken?email=${email}`, {
    method: "GET",
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
        dispatch(resendTokenSignUpFailed(response.message));
      } else {
        dispatch(resendTokenSignUpSuccessfully(response.message));
        callback();
      }
    })
    .catch((error) => {
      console.log("Register ", error.message);
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

export const postResetPassword = (
  resetPasswordDetails: ResetPasswordDetails,
  callback: () => void
) => (dispatch: any) => {
  const data = JSON.stringify(resetPasswordDetails);
  console.log(data);
  return fetch(baseUrl + "auth/forgotPassword", {
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
        dispatch(resetPasswordFailed(response.message));
      } else {
        dispatch(resetPasswordSuccessfully(response.message));
        callback();
      }
    })
    .catch((error) => {
      console.log("Register ", error.message);
    });
};

export const sendResetPasswordTokenSuccessfully = (payload: any) => {
  return {
    type: AuthActionTypes.SEND_RESET_PASSWORD_TOKEN_SUCCESSFULLY,
    payload: payload,
  };
};

export const sendResetPasswordTokenFailed = (payload: any) => {
  return {
    type: AuthActionTypes.SEND_RESET_PASSWORD_TOKEN_FAILED,
    payload: payload,
  };
};

export const sendForgotPasswordToken = (
  email: string,
  callback: () => void
) => (dispatch: any) => {
  return fetch(`${baseUrl}auth/sendForgotPasswordToken?email=${email}`, {
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
      if (!response.error) {
        const payload = { email, successMessage: response.message };
        dispatch(sendResetPasswordTokenSuccessfully(payload));
        callback();
      } else {
        const payload = { email, errMess: response.message };
        dispatch(sendResetPasswordTokenFailed(payload));
        callback(); //TODO remove later
      }
    })
    .catch((error) => {
      console.log("Send reset password token ", error.message);
    });
};
