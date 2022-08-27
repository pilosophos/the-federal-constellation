// TIME

let CAESIUM_FREQ = 9192631770;
let PERIODS = Math.pow(12, 12);

function chronsToMetricTime(chrons) {
  let seconds = chrons * (PERIODS / CAESIUM_FREQ);
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let months = days / 30;
  let years = days / 365;
  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    months: months,
    years: years
  };
}

function fillMetricTimeWith(chrons) {
  for (let [unit, value] of Object.entries(chronsToMetricTime(chrons))) {
    document.getElementById(unit).textContent = value.toLocaleString();
  }
}
fillMetricTimeWith(1);

function updateTimeDisplay() {
  fillMetricTimeWith(chronInput.value * Math.pow(12, chronMagnitude.value));
}

let chronInput = document.getElementById("chrons");
let chronMagnitude = document.getElementById("chronMagnitude");
chronInput.addEventListener("input", updateTimeDisplay);
chronMagnitude.addEventListener("input", updateTimeDisplay);