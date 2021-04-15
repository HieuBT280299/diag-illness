export const getValueOf = (str: string) => {
  if (str && str !== "") return str;
  return "N/A";
};

export const getFullAddress = ({ number, ward, district, city }: any) => {
  return `${number}, ${ward}, ${district}, ${city}`;
};

export const getFullContact = ({ website, phone }: any) => {
  const displayWebsite =
    website && website !== "" ? (
      <span>
        Website: <a href={website}>{website}</a>
        <br />
      </span>
    ) : (
      ""
    );
  const displayPhone = phone && phone !== "" ? <span>Phone: {phone}</span> : "";
  return (
    <span>
      {displayWebsite}

      {displayPhone}
    </span>
  );
};
