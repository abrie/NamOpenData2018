const input = {
  hour: undefined,
  day: undefined,
  month: undefined,
  gender: undefined,
  driving: undefined,
  vehicle_type: undefined,
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
hourSelector.addEventListener("input", (evt) => input.hour = evt.target.value);

const daySelector = document.getElementById("day-selector");
daySelector.addEventListener("input", (evt) => input.day = evt.target.value);

const monthSelector = document.getElementById("month-selector");
monthSelector.addEventListener("input", (evt) => input.month = evt.target.value);

populateVehicleTypeSelector( document.getElementById("vehicle-selector") );

function populateVehicleTypeSelector(element) {
  vehicle_types.forEach( function(str) { element.appendChild(createOption(str)) } );
}

