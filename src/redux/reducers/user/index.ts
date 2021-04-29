import * as UserActionTypes from "../../actions/types/user";

export const Users = (
  state = {
    isLoading: true,
    errMess: null,
    users: null,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    successMessage: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload?.data?.list,
        totalPages: action.payload?.data?.totalPage,
        totalEntries: action.payload?.data?.totalEntries,
        currentPage: action.payload?.paginationData?.page,
        searchData: action.payload?.searchData,
        successMessage: null,
      };

    case UserActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case UserActionTypes.PROMOTE_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        successMessage: action.payload.successMessage,
      };

    case UserActionTypes.PROMOTE_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    default:
      return state;
  }
};
