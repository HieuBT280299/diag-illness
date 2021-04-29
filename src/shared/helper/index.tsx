import { PageListItem } from "../constants";

export const getHeaderTitle = (list: PageListItem[], path: string) => {
  if (list.length) {
    const activeItem = list.find((item) => item.to === path);
    if (activeItem !== undefined) return activeItem.text;
  }
  return "Hệ thống hỗ trợ chẩn đoán bệnh";
};

export const sortByName = (
  a: { id: string; name: string },
  b: { id: string; name: string }
) => a.name.localeCompare(b.name);
