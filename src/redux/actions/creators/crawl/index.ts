import * as CrawlActionTypes from "../../types/crawl";
import { baseUrl } from "../../../../shared/baseUrl";
import qs from "qs";
import { getSearchParams } from "./index.helper";

export const getCrawlListSuccessfully = (payload: any) => {
  return {
    type: CrawlActionTypes.FETCH_CRAWL,
    payload,
  };
};

export const getCrawlListFailed = (message: any) => {
  return {
    type: CrawlActionTypes.CRAWL_FAILED,
    payload: message,
  };
};

export const getCrawlList =
  (searchData: any, paginationData: any, token: string) => (dispatch: any) => {
    const { page, size } = paginationData;

    const paginationParams = qs.stringify({ page, size });

    return fetch(
      `${baseUrl}crawl?search=${getSearchParams(
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
          dispatch(getCrawlListFailed(response.message));
        } else {
          const payload = {
            data: response.data,
            paginationData,
            searchData,
          };
          dispatch(getCrawlListSuccessfully(payload));
        }
      })
      .catch((error) => {
        console.log("Get crawl list ", error.message);
      });
  };

export const uploadCrawlJsonSuccessfully = (payload: any) => {
  return {
    type: CrawlActionTypes.UPLOAD_CRAWL,
    payload,
  };
};

export const uploadCrawlJsonFailed = (message: any) => {
  return {
    type: CrawlActionTypes.UPLOAD_CRAWL_FAILED,
    payload: message,
  };
};

export const uploadCrawlJson =
  (userId: string | number, jsonData: any, token: string) =>
  (dispatch: any) => {
    return fetch(`${baseUrl}crawl/${userId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
      body: JSON.stringify(jsonData),
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
          dispatch(uploadCrawlJsonFailed(response.message));
        } else {
          const payload = {
            uploadTime: response.date,
            uploadSuccessMessage: response.message,
          };
          dispatch(uploadCrawlJsonSuccessfully(payload));
        }
      })
      .catch((error) => {
        console.log("Get crawl list ", error.message);
      });
  };
