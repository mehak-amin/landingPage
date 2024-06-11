export default function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  let timeString = "";
  if (hours > 0) {
    timeString += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    timeString += `${minutes}min`;
  }

  if (timeString === "") {
    timeString = "0min";
  }

  return timeString.trim();
}
