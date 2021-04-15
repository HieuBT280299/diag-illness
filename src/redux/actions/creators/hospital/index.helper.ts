export const getSearchParams = (searchData: any) => {
  let params = "";
  Object.keys(searchData).forEach((key) => {
    switch (key) {
      case "name":
      case "number":
      case "phone":
        params += ` AND ${key}:'*${searchData[key]}*'`;
        break;
      case "cityCode":
      case "districtCode":
      case "wardCode":
        params += ` AND ${key}:${searchData[key]}`;
        break;
    }
  });
  params = params.trim().replace("AND", ""); // remove the first "AND" and trim spaces
  return `(${params})`;
};
