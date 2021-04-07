import { SidebarListItem } from "../constants";

export const getHeaderTitle = (list: SidebarListItem[], path: string) => {
  if (list.length) {
    const activeItem = list.find((item) => item.to === path);
    if (activeItem !== undefined) return activeItem.text;
  }
  return "Illness Diagnosis System";
};

export const sortByName = (
  a: { id: string; name: string },
  b: { id: string; name: string }
) => a.name.localeCompare(b.name);
