const dateFormat = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};

function formatIndonesianTimestamp(timestamp) {
  const date = new Date(timestamp);
  
  return `${date.toLocaleString("id-ID", dateFormat)} WIB`;
}

export default formatIndonesianTimestamp;