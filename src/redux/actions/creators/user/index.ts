import * as UserActionTypes from "../../types/user";
import { baseUrl } from "../../../../shared/baseUrl";
import qs from "qs";
import { getSearchParams } from "./index.helper";

export const getUserListSuccessfully = (payload: any) => {
  return {
    type: UserActionTypes.FETCH_USERS,
    payload,
  };
};

export const getUserListFailed = (message: any) => {
  return {
    type: UserActionTypes.USERS_FAILED,
    payload: message,
  };
};

export const getUserList = (
  searchData: any,
  paginationData: any,
  token: string
) => (dispatch: any) => {
  const paginationParams = qs.stringify(paginationData);
  // console.log(searchData);
  // console.log(getSearchParams(searchData));

  return fetch(
    `${baseUrl}users?search=${getSearchParams(searchData)}&${paginationParams}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    }
  )
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
      if (response.error) {
        dispatch(getUserListFailed(response.message));
      } else {
        const payload = {
          data: response.data,
          paginationData,
          searchData,
        };
        dispatch(getUserListSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Get user list ", error.message);
    });
};

export const promoteUserSuccessfully = (payload: any) => {
  return {
    type: UserActionTypes.PROMOTE_USERS,
    payload,
  };
};

export const promoteUserFailed = (message: any) => {
  return {
    type: UserActionTypes.PROMOTE_USERS_FAILED,
    payload: message,
  };
};

export const postPromoteUser = (email: string, token: string) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}users/grant?email=${email}`, {
    method: "POST",
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
      if (response.error) {
        dispatch(promoteUserFailed(response.message));
      } else {
        const payload = {
          successMessage: response.message,
          data: response.data,
        };
        await dispatch(promoteUserSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Promote user ", error.message);
    });
};
