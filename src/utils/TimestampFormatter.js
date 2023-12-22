const dateFormat = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};

function formatIndonesianTimestamp(timestamp, locale) {
  const date = new Date(timestamp);
  const localeString = locale === "en" ? "en-US" : "id-ID";

  return `${date.toLocaleString(localeString, dateFormat)} WIB`;
}

export default formatIndonesianTimestamp;