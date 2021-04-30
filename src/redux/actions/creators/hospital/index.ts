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
  type: "simple" | "full",
  searchData: any,
  paginationData: any,
  token: string
) => (dispatch: any) => {
  const { page, size } = paginationData;
  const from = (page - 1) * size;
  const simpleParams = {
    q: `"${searchData}"`,
    from,
    size,
  };
  const data = {
    full: {
      url: `${baseUrl}hospital?search=${getSearchParams(
        searchData
      )}&${qs.stringify(paginationData)}`,
      method: "GET",
    },
    simple: {
      url: `${baseUrl}hospital/search?${qs.stringify(simpleParams)}`,
      method: "GET",
    },
  };

  console.log(data[type].url);

  return fetch(data[type].url, {
    method: data[type].method,
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
    .then((response) => {
      if (response.error) {
        dispatch(getHospitalListFailed(response.message));
      } else {
        const payload = {
          data: response.data,
          paginationData,
          searchData,
          type,
        };
        dispatch(getHospitalListSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Get hospital list ", error.message);
    });
};

export const uploadHospitalCsvSuccessfully = (payload: any) => {
  return {
    type: HospitalActionTypes.UPLOAD_HOSPITALS,
    payload,
  };
};

export const uploadHospitalCsvFailed = (message: any) => {
  return {
    type: HospitalActionTypes.UPLOAD_HOSPITALS_FAILED,
    payload: message,
  };
};

export const uploadHospitalCsv = (formData: any, token: string) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}hospital/upload`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: token,
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    },
    body: formData,
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
      if (response.error) {
        dispatch(uploadHospitalCsvFailed(response.message));
      } else {
        dispatch(uploadHospitalCsvSuccessfully(response.message));
      }
    })
    .catch((error) => {
      console.log("Get hospital list ", error.message);
    });
};

export const deleteHospitalsSuccessfully = (payload: any) => {
  return {
    type: HospitalActionTypes.DELETE_HOSPITALS,
    payload,
  };
};

export const deleteHospitalsFailed = (message: any) => {
  return {
    type: HospitalActionTypes.DELETE_HOSPITALS_FAILED,
    payload: message,
  };
};

export const deleteHospitals = (data: any, token: string) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}hospital/delete`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: token,
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
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
      if (response.error) {
        dispatch(deleteHospitalsFailed(response.message));
      } else {
        dispatch(deleteHospitalsSuccessfully(response.message));
      }
    })
    .catch((error) => {
      console.log("Delete hospitals ", error.message);
    });
};
