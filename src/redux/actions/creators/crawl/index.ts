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
  (formData: any, token: string) => (dispatch: any) => {
    return fetch(`${baseUrl}crawl/upload`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
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
          dispatch(uploadCrawlJsonFailed(response.message));
        } else {
          const payload = {
            uploadedCrawl: response.data,
            uploadSuccessMessage: response.message,
          };
          dispatch(uploadCrawlJsonSuccessfully(payload));
        }
      })
      .catch((error) => {
        console.log("Get crawl list ", error.message);
      });
  };

export const deleteCrawlSuccessfully = (payload: any) => {
  return {
    type: CrawlActionTypes.DELETE_CRAWL,
    payload,
  };
};

export const deleteCrawlFailed = (message: any) => {
  return {
    type: CrawlActionTypes.DELETE_CRAWL_FAILED,
    payload: message,
  };
};

export const deleteCrawl = (data: any, token: string) => (dispatch: any) => {
  return fetch(`${baseUrl}crawl/delete`, {
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
    .then(async (response) => {
      if (response.error) {
        dispatch(deleteCrawlFailed(response.message));
      } else {
        await dispatch(deleteCrawlSuccessfully(response.message));
        await setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    })
    .catch((error) => {
      console.log("Delete crawl ", error.message);
    });
};

export const editCrawlSuccessfully = (payload: any) => {
  return {
    type: CrawlActionTypes.EDIT_CRAWL,
    payload,
  };
};

export const editCrawlFailed = (message: any) => {
  return {
    type: CrawlActionTypes.EDIT_CRAWL_FAILED,
    payload: message,
  };
};

export const editCrawl =
  (data: any, token: string, callback: () => void) => (dispatch: any) => {
    return fetch(`${baseUrl}crawl/edit`, {
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
      .then(async (response) => {
        if (response.error) {
          dispatch(editCrawlFailed(response.message));
        } else {
          await dispatch(editCrawlSuccessfully(response.message));
          await callback();
          await setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch((error) => {
        console.log("Edit crawl ", error.message);
      });
  };

export const addNewCrawlSuccessfully = (payload: any) => {
  return {
    type: CrawlActionTypes.ADD_CRAWL,
    payload,
  };
};

export const addNewCrawlFailed = (message: any) => {
  return {
    type: CrawlActionTypes.ADD_CRAWL_FAILED,
    payload: message,
  };
};

export const addNewCrawl =
  (data: any, token: string, callback: () => void) => (dispatch: any) => {
    return fetch(`${baseUrl}crawl/add`, {
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
      .then(async (response) => {
        if (response.error) {
          dispatch(addNewCrawlFailed(response.message));
        } else {
          await dispatch(addNewCrawlSuccessfully(response.message));
          await callback();
          await setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch((error) => {
        console.log("Add crawl ", error.message);
      });
  };
