import { Gender, RoleIDs } from "../../../shared/constants";

export const getValueOf = (str: string) => {
  if (str && str !== "") return str;
  return "N/A";
};

export const getGenderValue = (gender: number) => {
  switch (gender) {
    case Gender.MALE:
      return "Nam";
    case Gender.FEMALE:
      return "Nữ";
  }
};

export const getEnabledValue = (enabled: number) => {
  switch (enabled) {
    case 1:
      return "Có";
    case 0:
      return "Không";
  }
};

export const getRoleValue = (roleId: number) => {
  switch (roleId) {
    case RoleIDs.ROLE_USER:
      return "Người dùng";
    case RoleIDs.ROLE_ADMIN:
      return "Quản trị viên";
  }
};

export const toLocalDate = (dateStr: string) => {
  if (dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
  } else return "N/A";
};

export const toLocalDateAndTime = (dateStr: string) => {
  if (dateStr) {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN")
    );
  } else return "N/A";
};
