export function formatDate(timestamp) {
  let date = new Date(timestamp / 1);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

export function formatAmount(x) {
  if (typeof x === "undefined") {
    return "";
  }
  const num = typeof x === "string" ? x : parseFloat(x);
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmountDecimal(x) {
  if (typeof x === "undefined") {
    return "";
  }
  const num = typeof x === "string" ? x : parseFloat(x);
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


