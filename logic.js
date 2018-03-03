const state = {
  hour: undefined,
  day: undefined,
  month: undefined,
  gender: undefined,
  age: undefined,
  driving: undefined,
  vehicle_type: undefined,
}

function recompute() {
  console.log(scoreRegionsByDayOfWeek(state.day));
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

