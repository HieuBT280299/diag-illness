export const getValueOf = (str: string) => {
  if (str && str !== "" && str !== "-") return str;
  return "N/A";
};

export const getFullAddress = ({ number, ward, district, city }: any) => {
  return `${number}, ${ward}, ${district}, ${city}`;
};

export const toLocalDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export const toLocalDateAndTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

export const getFullContact = ({ website, phone }: any) => {
  const displayWebsite =
    website && website !== "" && website !== "-" ? (
      <span>
        Website: <a href={website}>{website}</a>
        <br />
      </span>
    ) : (
      ""
    );
  const displayPhone =
    phone && phone !== "" && phone !== "-" ? <span>Phone: {phone}</span> : "";
  return (
    <span>
      {displayWebsite}

      {displayPhone}
    </span>
  );
};
