export const getDomainFromUrl = (url: string) => {
  const domain = new URL(url).hostname;
  return domain;
};

export const displayTags = (tags: string[]) => {
  return tags.toString().replaceAll(",", ", ");
};

export const getTagArray = (tagString: string) => {
  return tagString.toString().replace(", ", ",").split(",");
};
