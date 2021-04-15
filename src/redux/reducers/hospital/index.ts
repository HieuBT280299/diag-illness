import * as HospitalActionTypes from "../../actions/types/hospital";

export const Hospitals = (
  state = {
    isLoading: true,
    errMess: null,
    hospitals: null,
    currentPageNumber: 0,
    numberOfPages: 0,
    totalEntries: 0,
    searchData: null,
    successStatus: false,
    deleteSuccessStatus: false,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case HospitalActionTypes.FETCH_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        hospitals: action.payload?.data?.list,
        numberOfPages: action.payload?.data?.numberOfPages,
        totalEntries: action.payload?.data?.total,
        currentPageNumber: action.payload?.paginationData.page,
      };

    case HospitalActionTypes.HOSPITALS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
