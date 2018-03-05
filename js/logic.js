const state = {
  hour: undefined,
  day: undefined,
  month: undefined,
  gender: undefined,
  age: undefined,
  vehicle_type: undefined,
  accident_type: undefined,
  frameRequest: undefined,
}

const hour_labels = [
  "00:00",
  "02:00",
  "04:00",
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
  "22:00",
];

const day_labels = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat"
];

const month_labels = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

var canvas = document.getElementById("map-canvas");
var context = canvas.getContext('2d');
var regionImages = loadImages();

function recompute(base) {
  var regionDayScores = scoreRegionsByDayOfWeek(state.day, 0.25);

  var baseScore = undefined;
  if (state.type_table == 'vehicle') {
    baseScore = scoreRegionsByVehicleType(state.type_index, 0.50);
  } else if (state.type_table == 'involved') {
    baseScore = scoreRegionsByAccidentType(state.type_index, 0.50);
  }


  let scaledHours = scaledCrashesByHour(0.20);
  let hourScale = scaledHours[state.hour];

  let scaledMonths = scaledInjuriesByMonth(0.15);
  let monthScale = scaledMonths[state.month];

  function scoreFunction(base, idx) {
    return Math.min(1, 
      base +
      hourScale + 
      monthScale +
      regionDayScores[idx])
  }

  let sr = baseScore.map( (score, idx) => scoreFunction(score, idx) ) 

  clearMap();
  drawRoads();
  drawTowns();
  drawState();

  sr.forEach( (score, idx) => drawRegion(idx, score) );
}

function loadImages() {
  var regionImages = {};
  regionImages["caprivi"] = document.getElementById("map-caprivi");
  regionImages["hardap"] = document.getElementById("map-hardap");
  regionImages["kavango"] = document.getElementById("map-kavango");
  regionImages["kunene"] = document.getElementById("map-kunene");
  regionImages["ohangwena"] = document.getElementById("map-ohangwena");
  regionImages["omusati"] = document.getElementById("map-omusati");
  regionImages["oshikoto"] = document.getElementById("map-oshikoto");
  regionImages["erongo"] = document.getElementById("map-erongo");
  regionImages["karas"] = document.getElementById("map-karas");
  regionImages["khomas"] = document.getElementById("map-khomas");
  regionImages["omaheke"] = document.getElementById("map-omaheke");
  regionImages["oshana"] = document.getElementById("map-oshana");
  regionImages["otjozondjupa"] = document.getElementById("map-otjozondjupa");

  return regionImages;
}


function drawState() {
  const hourLabel = hour_labels[state.hour];
  const dayLabel = day_labels[state.day];
  const monthLabel = month_labels[state.month];
  const yearLabel = "2016";
  
  const hourElement = document.getElementById("displayed-hour");
  hourElement.innerHTML = `${hourLabel}`;

  const dayElement = document.getElementById("displayed-day");
  dayElement.innerHTML = `${dayLabel}`;

  const monthElement = document.getElementById("displayed-month");
  monthElement.innerHTML = `${monthLabel}`;

  const yearElement = document.getElementById("displayed-year");
  yearElement.innerHTML = `${yearLabel}`;

}

function clearMap() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMap(region) {
  let background = document.getElementById("map-background");
  context.globalAlpha = 1;
  context.drawImage(background, 0, 0);
}
function drawRoads(){
  const roadImage = document.getElementById("map-roads");
  context.globalAlpha = 1;
  context.drawImage(roadImage,0,0);
}
function drawTowns(){
  const townImage = document.getElementById("map-towns");
  context.globalAlpha = 1;
  context.drawImage(townImage,0,0);
}

function drawRegion(idx, alpha) {
  let regionName = regions[idx];
  context.globalAlpha = alpha;
  context.drawImage(regionImages[regionName], 0, 0);
}

function createOption(idx, table, str) {
  var el = document.createElement("option");
  el.innerHTML = str;
  el.setAttribute("value", `${table}-${idx}`);
  return el;
}

var lastTime = 0;

function onFrame(timestamp) {
  const delta = timestamp - lastTime;

  if (delta >= 500) {
    lastTime = timestamp;
    incrementStateTime();
  }

  state.frameRequest = undefined;
  updateState();
}

function incrementStateTime() {
  let hour = state.hour;
  let day = state.day;
  let month = state.month;

  hour+=1;
  if (hour >= 12) {
    hour = 0;
    day += 1;
    if (day >= 7) {
      day = 0;
      month += 1;
      if (month >= 12) {
        month = 0;
      }
    }
  }

  hourSelector.value = hour;
  daySelector.value = day;
  monthSelector.value = month;
}

function requestFrame() {
  state.frameRequest = window.requestAnimationFrame(onFrame);
}

function updateState() {
  state.animatorRunning = animatorToggle.checked; 
  state.hour = parseInt(hourSelector.value);
  state.day = parseInt(daySelector.value);
  state.month = parseInt(monthSelector.value);

  let typeParts = vehicleSelector.value.split("-");
  state.type_table = typeParts[0];
  state.type_index = parseInt(typeParts[1]);

  recompute();

  if (state.animatorRunning === true) {
    if (state.frameRequest === undefined) {
      requestFrame();
    }
  } else {
    if (state.frameRequest !== undefined) {
      window.cancelAnimationFrame(state.frameRequest);
      state.frameRequest = undefined;
    }
  }
}

const hourSelector = document.getElementById("hour-selector");
hourSelector.addEventListener("input", updateState );

const daySelector = document.getElementById("day-selector");
daySelector.addEventListener("input", updateState );

const monthSelector = document.getElementById("month-selector");
monthSelector.addEventListener("input", updateState );

const animatorToggle = document.getElementById("animator-toggle");
animatorToggle.addEventListener("change", updateState );

const vehicleSelector = document.getElementById("vehicle-selector");
populateVehicleTypeSelector(vehicleSelector, "vehicle");
populateInvolvedSelector(vehicleSelector, "involved");
vehicleSelector.addEventListener("change", updateState);

function populateVehicleTypeSelector(element, table) {
  vehicle_types.forEach( function(str, idx) { 
    let option = createOption(idx, table, str);
    element.appendChild(option) 
  });
}

function populateInvolvedSelector(element, table) {
  accident_types.forEach( function(str, idx) { 
    let option = createOption(idx, table, str);
    element.appendChild(option) 
  });
}

function populateAgeSelector( el ) {
  getAgeGroups().forEach( (ageGroup) => {
    const op = document.createElement("option");
    op.setAttribute("value", ageGroup);
    op.innerHTML = ageGroup;
    el.appendChild(op);
  });
}

window.onload = function() {
  updateState();
}
