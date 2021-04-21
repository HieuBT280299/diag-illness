import * as UserActionTypes from "../../actions/types/user";

export const Users = (
  state = {
    isLoading: true,
    errMess: null,
    users: null,
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    successStatus: false,
    deleteSuccessStatus: false,
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
      };

    case UserActionTypes.USERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
