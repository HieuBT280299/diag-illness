import * as NewsActionTypes from "../../types/news";
import { baseUrl } from "../../../../shared/baseUrl";
import qs from "qs";

export const getNewsListSuccessfully = (payload: any) => {
  return {
    type: NewsActionTypes.FETCH_NEWS,
    payload,
  };
};

export const getNewsListFailed = (message: any) => {
  return {
    type: NewsActionTypes.NEWS_FAILED,
    payload: message,
  };
};

export const getNewsList = (
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
  const {
    ward,
    district,
    city,
    wardCode,
    districtCode,
    cityCode,
    ...rest
  } = searchData;
  const mustFields = Object.keys(rest).map((key) => ({
    match: { [key]: rest[key] },
  }));
  // console.log(mustFields);
  const fullBody = {
    from,
    size,
    query: {
      bool: {
        must: mustFields,
        filter: {
          term: {
            ward,
            district,
            city,
            wardCode,
            districtCode,
            cityCode,
          },
        },
      },
    },
  };
  console.log(JSON.stringify(fullBody));
  const data = {
    full: {
      url: `${baseUrl}news/search`,
      method: "POST",
      body: JSON.stringify(fullBody),
    },
    simple: {
      url: `${baseUrl}news/search?${qs.stringify(simpleParams)}`,
      method: "GET",
      body: undefined,
    },
  };

  return fetch(data[type].url, {
    method: data[type].method,
    mode: "cors",
    headers: {
      Authorization: token,
    },
    body: data[type].method === "POST" ? data[type].body : undefined,
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
        dispatch(getNewsListFailed(response.message));
      } else {
        const payload = {
          data: response.data,
          paginationData,
          searchData,
          type,
        };
        dispatch(getNewsListSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Get news list ", error.message);
    });
};

export const uploadNewsCsvSuccessfully = (payload: any) => {
  return {
    type: NewsActionTypes.UPLOAD_NEWS,
    payload,
  };
};

export const uploadNewsCsvFailed = (message: any) => {
  return {
    type: NewsActionTypes.UPLOAD_NEWS_FAILED,
    payload: message,
  };
};

export const uploadNewsCsv = (formData: any, token: string) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}news/upload`, {
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
        dispatch(uploadNewsCsvFailed(response.message));
      } else {
        const payload = {
          uploadedNews: response.data,
          uploadSuccessMessage: response.message,
        };
        dispatch(uploadNewsCsvSuccessfully(payload));
      }
    })
    .catch((error) => {
      console.log("Get news list ", error.message);
    });
};

export const deleteNewsSuccessfully = (payload: any) => {
  return {
    type: NewsActionTypes.DELETE_NEWS,
    payload,
  };
};

export const deleteNewsFailed = (message: any) => {
  return {
    type: NewsActionTypes.DELETE_NEWS_FAILED,
    payload: message,
  };
};

export const deleteNews = (data: any, token: string) => (dispatch: any) => {
  return fetch(`${baseUrl}news/delete`, {
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
        dispatch(deleteNewsFailed(response.message));
      } else {
        await dispatch(deleteNewsSuccessfully(response.message));
        await setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    })
    .catch((error) => {
      console.log("Delete news ", error.message);
    });
};

export const editNewsSuccessfully = (payload: any) => {
  return {
    type: NewsActionTypes.EDIT_NEWS,
    payload,
  };
};

export const editNewsFailed = (message: any) => {
  return {
    type: NewsActionTypes.EDIT_NEWS_FAILED,
    payload: message,
  };
};

export const editNews = (data: any, token: string, callback: () => void) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}news/edit`, {
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
        dispatch(editNewsFailed(response.message));
      } else {
        await dispatch(editNewsSuccessfully(response.message));
        await callback();
        await setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    })
    .catch((error) => {
      console.log("Edit news ", error.message);
    });
};

export const addNewNewsSuccessfully = (payload: any) => {
  return {
    type: NewsActionTypes.ADD_NEWS,
    payload,
  };
};

export const addNewNewsFailed = (message: any) => {
  return {
    type: NewsActionTypes.ADD_NEWS_FAILED,
    payload: message,
  };
};

export const addNewNews = (data: any, token: string, callback: () => void) => (
  dispatch: any
) => {
  return fetch(`${baseUrl}news/add`, {
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
        dispatch(addNewNewsFailed(response.message));
      } else {
        await dispatch(addNewNewsSuccessfully(response.message));
        await callback();
        await setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }
    })
    .catch((error) => {
      console.log("Add news ", error.message);
    });
};
