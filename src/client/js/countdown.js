function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

function updateCountdown() {
  const today = new Date();
  const travelDate = document.getElementById("travel-date").value;
  const count = getNumberOfDays(today, travelDate);
  document.getElementById("countdown").innerHTML = `Countdown: ${count}`;
}

export default updateCountdown;