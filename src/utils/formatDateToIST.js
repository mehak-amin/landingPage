export default function formatDateToIST(dateString) {
  const date = new Date(dateString);

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

  let dateParts = {};
  parts.forEach((part) => {
    dateParts[part.type] = part.value;
  });

  const formattedDate = `${dateParts.weekday} ${dateParts.day} ${dateParts.month}, ${dateParts.year} ${dateParts.hour}:${dateParts.minute} ${dateParts.dayPeriod}`;

  return formattedDate;
}
