import * as CrawlActionTypes from "../../actions/types/crawl";

export const Crawl = (
  state = {
    isLoading: true,
    errMess: null,
    crawl: null,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    uploadErrMess: null,
    uploadSuccessMessage: null,
    uploadTime: null,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case CrawlActionTypes.FETCH_CRAWL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        crawl: action.payload?.data?.list,
        totalPages: action.payload?.data?.totalPage,
        totalEntries: action.payload?.data?.totalEntries,
        currentPage: action.payload?.paginationData?.page,
        searchData: action.payload?.searchData,
      };

    case CrawlActionTypes.CRAWL_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    case CrawlActionTypes.UPLOAD_CRAWL:
      return {
        ...state,
        isLoading: false,
        uploadSuccessMessage: action.payload?.uploadSuccessMessage,
        uploadTime: action.payload?.uploadTime,
        uploadErrMess: null,
      };

    case CrawlActionTypes.UPLOAD_CRAWL_FAILED:
      return {
        ...state,
        isLoading: false,
        uploadErrMess: action.payload,
        uploadSuccessMessage: null,
        uploadTime: null,
      };

    default:
      return state;
  }
};
