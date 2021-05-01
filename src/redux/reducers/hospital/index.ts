import * as HospitalActionTypes from "../../actions/types/hospital";

export const Hospitals = (
  state = {
    isLoading: true,
    errMess: null,
    hospitals: null,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    type: "simple",
    successMessage: null,
    deleteSuccessStatus: false,
    editErrMess: null,
    addNewErrMess: null,
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
        totalPages: action.payload?.data?.totalPage,
        totalEntries: action.payload?.data?.totalEntries,
        currentPage: action.payload?.paginationData?.page,
        searchData: action.payload?.searchData,
        type: action.payload?.type,
      };

    case HospitalActionTypes.HOSPITALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case HospitalActionTypes.UPLOAD_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        errMess: null,
      };

    case HospitalActionTypes.UPLOAD_HOSPITALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case HospitalActionTypes.DELETE_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        errMess: null,
      };

    case HospitalActionTypes.DELETE_HOSPITALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        successMessage: null,
      };

    case HospitalActionTypes.EDIT_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        editErrMess: null,
      };

    case HospitalActionTypes.EDIT_HOSPITALS_FAILED:
      return {
        ...state,
        isLoading: false,
        editErrMess: action.payload,
        successMessage: null,
      };

    case HospitalActionTypes.ADD_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.payload,
        addNewErrMess: null,
      };

    case HospitalActionTypes.ADD_HOSPITALS_FAILED:
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
