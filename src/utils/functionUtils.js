export const formatTime = (time) => {
  if (!time) return "";
  const date = new Date(time);
  if (isNaN(date)) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
