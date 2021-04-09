import * as AuthActionTypes from "../../types/auth";
import qs from 'qs';
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

// export const postLogin = (loginDetails: any) => (dispatch: any) => {
//   const data = qs.stringify(loginDetails);
//   return fetch(baseUrl + 'auth/login', {
//       method: 'POST',
//       body: data,
//       // mode: "cors",
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       credentials: 'include'
//   })
//       .then(response => {
//           if (response.ok || response.status === 400) {
//               return response;
//           } else {
//               var error = new Error('Error ' + response.status + ': ' + response.statusText);
//               error.response = response;
//               throw error;
//           }
//       },
//           error => {
//               var errMess = new Error(error.message);
//               throw errMess;
//           })
//       .then(response => {
//           return response.json();
//       })
//       .then(response => {
//           if (response.account == null) {
//               dispatch(loginFailed(response.error))
//           } else {
//               Cookies.set('account', response.account, { expires: 1 });
//               dispatch(loginSuccessfully(response.account));
//           }

//       })
//       .catch(error => {
//           console.log('Login ', error.message);
//           dispatch(submitFailed(ERROR_MESSAGE_SUBMIT_GENERAL));
//       });

// }