import * as HospitalActionTypes from "../../types/hospital";
import { baseUrl } from "../../../../shared/baseUrl";
import qs from "qs";
import { getSearchParams } from "./index.helper";

export const getHospitalListSuccessfully = (payload: any) => {
  return {
    type: HospitalActionTypes.FETCH_HOSPITALS,
    payload,
  };
};

export const getHospitalListFailed = (message: any) => {
  return {
    type: HospitalActionTypes.HOSPITALS_FAILED,
    payload: message,
  };
};

export const getHospitalList = (
  searchData: any,
  paginationData: any,
  token: string
) => (dispatch: any) => {
  const paginationParams = qs.stringify(paginationData);
  console.log(paginationParams);

  return fetch(
    `${baseUrl}hospital?search=${getSearchParams(
      searchData
    )}&${paginationParams}`,
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
        dispatch(getHospitalListFailed(response.message));
      } else {
        const payload = {
          data: response.data,
          paginationData,
          searchData,
        };
        dispatch(getHospitalListSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Get hospital list ", error.message);
    });
};
