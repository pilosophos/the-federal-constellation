// TIME: 1 chron = 12^12 periods of caesium transition radiation

const CAESIUM_FREQ = 9192631770;
const PERIODS = Math.pow(12, 12);

function chronsToMetricTime(chrons) {
  let seconds = chrons * (PERIODS / CAESIUM_FREQ);
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let months = days / 30;
  let years = days / 365;

  let milliseconds = seconds * 1e3;
  let nanoseconds = seconds * 1e9;
  return {
    nanoseconds: nanoseconds,
    milliseconds: milliseconds,
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    months: months,
    years: years
  };
}

// LENGTH: 1 tetra = distance covered by light in 1/(12^12) chrons

const LIGHT_SPEED = 299792458;
const CHRON = chronsToMetricTime(1).seconds;
const TETRA_DIVISOR = Math.pow(12, 12);

const SECONDS_PER_YEAR = 3.154e7; // for light year conversion

function tetrasToMetricLength(tetras) {
  let metres = tetras * LIGHT_SPEED * (CHRON / TETRA_DIVISOR)
  return {
    nanometres: metres * 1e9,
    millimetres: metres * 1e3,
    centimetres: metres * 1e2,
    metres: metres,
    kilometres: metres / 1e3,
    lightyears: metres / (LIGHT_SPEED * SECONDS_PER_YEAR)
  };
}

// DOM MANIPULATION
const SI_PREFIXES = {
  // "yotta":  24,
  // "zetta":  21,
  "exa":    18,
  "peta":   15,
  "tera":   12,
  "giga":   9,
  "mega":   6,
  "myrio":  4,
  "kilo":   3,
  "hecto":  2,
  "deca":   1,
  // "yocto":  -24,
  // "zepto":  -21,
  // "atto":   -18,
  // "femto":  -15,
  // "pico":   -12,
  "nano":   -9,
  "micro":  -6,
  "milli":  -3,
  "centi":  -2,
  "deci":   -1,
}

const CONSTELLATION_UNITS = {
  chron: {
    inputValueID: "chrons",
    unitMagnitudeID: "chronMagnitude",
    convertFunc: chronsToMetricTime
  },
  tetra: {
    inputValueID: "tetras",
    unitMagnitudeID: "tetraMagnitude",
    convertFunc: tetrasToMetricLength
  }
}

for (const prefix in SI_PREFIXES) {
  for (const unit in CONSTELLATION_UNITS) {
    let unitMagnitudeID = CONSTELLATION_UNITS[unit].unitMagnitudeID;
    let baseUnitOption = document.querySelector(`#${unitMagnitudeID} > option[value='0']`);

    let prefixedUnitOption = document.createElement("option")
    prefixedUnitOption.value = SI_PREFIXES[prefix];
    prefixedUnitOption.textContent = prefix + unit;

    if (SI_PREFIXES[prefix] > 0) {
      baseUnitOption.after(prefixedUnitOption)
    } else {
      baseUnitOption.before(prefixedUnitOption)
    }
  }
}

function fillMetricUnitsWith(constellationToMetricFunc, constellationUnit) {
  for (let [unit, value] of Object.entries(constellationToMetricFunc(constellationUnit))) {
    document.getElementById(unit).textContent = value.toLocaleString();
  }
}

function updateUnitDisplay(convertFunc, inputValueID, unitMagnitudeID) {
  let unitMagnitude = document.getElementById(unitMagnitudeID).value;
  let inputValue = document.getElementById(inputValueID).value;
  fillMetricUnitsWith(convertFunc, inputValue * Math.pow(12, unitMagnitude));
}

for (const unit in CONSTELLATION_UNITS) {
  let {inputValueID, unitMagnitudeID, convertFunc} = CONSTELLATION_UNITS[unit];
  document.getElementById(inputValueID).value = 1;
  document.getElementById(inputValueID).addEventListener("input", () => updateUnitDisplay(convertFunc, inputValueID, unitMagnitudeID));
  document.getElementById(unitMagnitudeID).addEventListener("input", () => updateUnitDisplay(convertFunc, inputValueID, unitMagnitudeID));

  fillMetricUnitsWith(convertFunc, 1);
}