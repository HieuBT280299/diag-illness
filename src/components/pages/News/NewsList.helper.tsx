export const getDomainFromUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (e: any) {
    return url;
  }
};

export const displayTags = (tags: string[]) => {
  if (tags) return tags.toString().replaceAll(",", ", ");
  return "";
};

export const getTagArray = (tagString: string) => {
  if (tagString) return tagString.toString().replace(", ", ",").split(",");
  return [];
};
