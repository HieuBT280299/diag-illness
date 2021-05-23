export const getSearchParams = (searchData: any) => {
  let params = "";
  Object.keys(searchData).forEach((key) => {
    switch (key) {
      case "prefixUrl":
      case "startUrl":
      case "patternUrl":
      case "data":
        if (searchData[key] !== null && searchData[key] !== "")
          params += ` AND ${key}:'*${searchData[key]}*'`;
        break;
      case "userId":
        if (searchData[key] !== null && searchData[key] !== "")
          params += ` AND ${key}:${searchData[key]}`;
        break;
    }
  });
  params = params.replace("AND", "").trim(); // remove the first "AND" and trim spaces
  if (params === "") return "";
  return `(${params})`;
};
