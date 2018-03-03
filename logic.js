const state = {
  hour: undefined,
  day: undefined,
  month: undefined,
  gender: undefined,
  age: undefined,
  driving: undefined,
  vehicle_type: undefined,
}

var canvas = document.getElementById("map");
var context = canvas.getContext('2d');
var regionImages = loadImages();
drawMap();

function recompute() {
  var regionScores = scoreRegionsByDayOfWeek(state.day);
  drawMap();
  regionScores.forEach( (score, idx) => drawRegion(idx, score) );
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
  context.drawImage(background, 0, 0);
}

function drawRegion(idx, alpha) {
  let regionName = regions[idx];
  context.globalAlpha = alpha;
  context.drawImage(regionImages[regionName], 0, 0);
}

function createOption(str) {
  var el = document.createElement("option");
  el.innerHTML = str;
  el.setAttribute("value", str);
  return el;
}

const crashTargetSelector = document.getElementById("crash-target-selector");
crashTargetSelector.addEventListener("change", (evt) => console.log(evt.target.value));

const hourSelector = document.getElementById("hour-selector");
hourSelector.addEventListener("input", (evt) => state.hour = evt.target.value);

const daySelector = document.getElementById("day-selector");
daySelector.addEventListener("input", (evt) => { state.day = evt.target.value; recompute(); });

const monthSelector = document.getElementById("month-selector");
monthSelector.addEventListener("input", (evt) => state.month = evt.target.value);

populateVehicleTypeSelector( document.getElementById("vehicle-selector") );
populateAgeSelector( document.getElementById("age-selector") );

function populateVehicleTypeSelector(element) {
  vehicle_types.forEach( function(str) { element.appendChild(createOption(str)) } );
}

function populateAgeSelector( el ) {
  getAgeGroups().forEach( (ageGroup) => {
    const op = document.createElement("option");
    op.setAttribute("value", ageGroup);
    op.innerHTML = ageGroup;
    el.appendChild(op);
  });
}

