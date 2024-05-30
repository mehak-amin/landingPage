export function convertDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// const dateInput = "May 28, 2024";
// const formattedDate = convertDate(dateInput);
// console.log(formattedDate);
