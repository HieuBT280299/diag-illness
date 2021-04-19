import { Gender, RoleIDs } from "../../../shared/constants";

export const getValueOf = (str: string) => {
  if (str && str !== "") return str;
  return "N/A";
};

export const getGenderValue = (gender: number) => {
  switch (gender) {
    case Gender.MALE:
      return "Male";
    case Gender.FEMALE:
      return "Female";
  }
};

export const getRoleValue = (roleId: number) => {
  switch (roleId) {
    case RoleIDs.ROLE_USER:
      return "User";
    case RoleIDs.ROLE_ADMIN:
      return "Admin";
  }
};

export const toLocalDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export const toLocalDateAndTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
