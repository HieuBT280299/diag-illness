export const getDomainFromUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (e: any) {
    return url;
  }
};

export const displayTags = (tags: string[]) => {
  return tags.toString().replaceAll(",", ", ");
};

export const getTagArray = (tagString: string) => {
  return tagString.toString().replace(", ", ",").split(",");
};
