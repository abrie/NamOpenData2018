const state = {
  hour: undefined,
  day: undefined,
  month: undefined,
  gender: undefined,
  age: undefined,
  driving: undefined,
  vehicle_type: undefined,
  accident_type: undefined,
}



var canvas = document.getElementById("map");
var context = canvas.getContext('2d');
var regionImages = loadImages();

function recompute() {
  var regionScores = scoreRegionsByDayOfWeek(state.day);
  var regionVehicleScores = scoreRegionsByVehicleType(state.vehicle);
  var regionAccidentTypeScores = scoreRegionsByAccidentType(state.accident_type);

  let scaledHours = scaledCrashesByHour();
  let hourScale = scaledHours[state.hour] * 0.2;

  let scaledMonths = scaledInjuriesByMonth();
  let monthScale = scaledMonths[state.month] * 0.4;

  function scoreFunction(base, idx) {
    return Math.min(1, 
      base +
      hourScale + 
      monthScale +
      regionVehicleScores[idx] + 
      regionAccidentTypeScores[idx])
  }

  let sr = regionScores.map( (score, idx) => scoreFunction(score, idx) ) 

  drawMap();

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

function drawMap(region) {
  let background = document.getElementById("map-background");
  context.globalAlpha = 1;
  context.drawImage(background, 0, 0);
}

function drawRegion(idx, alpha) {
  let regionName = regions[idx];
  context.globalAlpha = alpha;
  context.drawImage(regionImages[regionName], 0, 0);
}

function createOption(idx, str) {
  var el = document.createElement("option");
  el.innerHTML = str;
  el.setAttribute("value", idx);
  return el;
}

function updateState() {
  state.hour = hourSelector.value;
  state.day = daySelector.value;
  state.month = monthSelector.value;
  state.vehicle = parseInt(vehicleSelector.value);
  state.accident_type = parseInt(accidentTypeSelector.value);

  recompute();
}

const hourSelector = document.getElementById("hour-selector");
hourSelector.addEventListener("input", updateState );

const daySelector = document.getElementById("day-selector");
daySelector.addEventListener("input", updateState );

const monthSelector = document.getElementById("month-selector");
monthSelector.addEventListener("input", updateState );

const vehicleSelector = document.getElementById("vehicle-selector");
populateVehicleTypeSelector( vehicleSelector );
vehicleSelector.addEventListener("change", updateState);
populateAgeSelector( document.getElementById("age-selector") );

const accidentTypeSelector = document.getElementById("accident-selector");
populateAccidentTypeSelector(accidentTypeSelector);
accidentTypeSelector.addEventListener("change", updateState);

function populateVehicleTypeSelector(element) {
  vehicle_types.forEach( function(str, idx) { element.appendChild(createOption(idx, str)) } );
}

function populateAccidentTypeSelector(element) {
  accident_types.forEach( function(str, idx) { element.appendChild(createOption(idx, str)) } );
}

function populateAgeSelector( el ) {
  getAgeGroups().forEach( (ageGroup) => {
    const op = document.createElement("option");
    op.setAttribute("value", ageGroup);
    op.innerHTML = ageGroup;
    el.appendChild(op);
  });
}

updateState();

// highlights the days of the week
daySelector.addEventListener("change",changeDay);
var past = 0;

function changeDay()
{
   
 document.getElementById(`${daySelector.value}`).style.color = "red";
 document.getElementById(`${past}`).style.color = "black";
 past = daySelector.value;
}
//highlights the days of the  week