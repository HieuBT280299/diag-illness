import * as NewsActionTypes from "../../actions/types/news";

export const News = (
  state = {
    isLoading: true,
    errMess: null,
    news: null,
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    type: "simple",
    successMessage: null,
    deleteSuccessStatus: false,
    editErrMess: null,
    addNewErrMess: null,
    uploadErrMess: null,
    uploadSuccessMessage: null,
    uploadedNews: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case NewsActionTypes.FETCH_NEWS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        news: action.payload?.data?.list,
        totalPages: action.payload?.data?.totalPage,
        totalEntries: action.payload?.data?.totalEntries,
        currentPage: action.payload?.paginationData?.page,
        searchData: action.payload?.searchData,
        type: action.payload?.type,
      };

    case NewsActionTypes.NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case NewsActionTypes.UPLOAD_NEWS:
      return {
        ...state,
        isLoading: false,
        uploadSuccessMessage: action.payload?.uploadSuccessMessage,
        uploadedNews: action.payload?.uploadedNews,
        uploadErrMess: null,
      };

    case NewsActionTypes.UPLOAD_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        uploadErrMess: action.payload,
        uploadSuccessMessage: null,
        uploadedNews: null,
      };

    case NewsActionTypes.DELETE_NEWS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        errMess: null,
      };

    case NewsActionTypes.DELETE_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case NewsActionTypes.EDIT_NEWS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        editErrMess: null,
      };

    case NewsActionTypes.EDIT_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        editErrMess: action.payload,
        successMessage: null,
      };

    case NewsActionTypes.ADD_NEWS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        addNewErrMess: null,
      };

    case NewsActionTypes.ADD_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        addNewErrMess: action.payload,
        successMessage: null,
      };

    default:
      return state;
  }
};
