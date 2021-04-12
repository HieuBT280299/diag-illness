import * as AuthActionTypes from "../../types/auth";
import { baseUrl } from "../../../../shared/baseUrl";

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
    // mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    // credentials: "include",
  })
    .then((response) => {
      if (response.ok || response.status === 400) {
        return response;
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        // error.response = response;
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

// export const postLogout = (token: string) => (dispatch: any) => {
//   return fetch(baseUrl + "auth/logout", {
//     method: "POST",
//     // mode: "cors",
//     // credentials: "include",
//     headers: {
//       "Token": token,
//     },
//   })
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error(
//             "Error " + response.status + ": " + response.statusText
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         var errMess = new Error(error.message);
//         throw errMess;
//       }
//     )
//     .then((response) => {
//       Cookies.remove("account");
//       return response.json();
//     })
//     .then(async (response) => {
//       await dispatch(logoutSuccessfully(response.message));
//       await setTimeout(() => {
//         window.location.reload(false);
//       }, 500);
//     })
//     .catch((error) => {
//       console.log("Logout ", error.message);
//       dispatch(submitFailed(ERROR_MESSAGE_SUBMIT_GENERAL));
//     });
// };
