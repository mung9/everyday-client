export function getYMD(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth()+1,
    date: dateObj.getDate()
  };
}