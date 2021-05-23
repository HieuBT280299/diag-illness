export const getValueOf = (str: string) => {
  if (str && str !== "") return str;
  return "N/A";
};

export const toLocalDateAndTime = (dateStr: string) => {
  if (dateStr) {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN")
    );
  } else return "N/A";
};

export const getStatusValue = (status: string | null) => {
  if (status)
    return (
      <div
        style={{
          backgroundColor: "green",
          color: "white",
          width: "100%",
          padding: "5px 0",
          textAlign: "center",
        }}
      >
        Đã xử lí xong
      </div>
    );
  return (
    <div
      style={{
        backgroundColor: "red",
        color: "white",
        width: "100%",
        padding: "5px 0",
        textAlign: "center",
      }}
    >
      Đang xử lí
    </div>
  );
};
