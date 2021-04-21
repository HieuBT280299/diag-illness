export const getSearchParams = (searchData: any) => {
  let params = "";
  Object.keys(searchData).forEach((key) => {
    switch (key) {
      case "name":
      case "email":
        if (searchData[key]) params += ` AND ${key}:'*${searchData[key]}*'`;
        break;
      case "gender":
      case "dateOfBirth":
        if (searchData[key]) params += ` AND ${key}:${searchData[key]}`;
        break;
    }
  });
  params = params.replace("AND", "").trim(); // remove the first "AND" and trim spaces
  if (params === "") return "";
  return `(${params})`;
};
