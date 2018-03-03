const regions = [
  "caprivi",
  "erongo",
  "hardap",
  "karas",
  "kavango",
  "khomas",
  "kunene",
  "ohangwena",
  "omaheke",
  "omusati",
  "oshana",
  "oshikoto",
  "otjozondjupa",
]

const number_of_injured_persons_per_month_per_year = [589,417,534,588,628,568,667,592,535,477,411,789,6795];
const number_of_crashes_by_hour_of_day = [223, 120, 129, 319, 254, 278, 365, 440, 582, 571, 433, 313, 78];
const number_of_crashes_per_day_of_week_by_region = [
  [11, 14, 13, 7, 3, 14, 19,81],
  [84, 55, 51, 52, 53, 78, 105,478],
  [42, 17, 16, 15, 22, 31, 33,176],
  [22 ,19, 13, 9, 14, 23, 19,119],
  [30, 21, 13, 24, 15, 27, 35,165],
  [241, 193, 192, 194, 203, 249, 342,1614],
  [18, 3, 6, 13, 20, 10, 17,87],
  [31, 18, 14, 18, 17, 27, 31,156],
  [17, 11, 8, 4, 7, 20, 18,85],
  [25, 26, 18, 20, 22, 26, 39,176],
  [63, 32, 38, 40, 47, 69, 75,364],
  [32, 35, 25, 31, 28, 35, 54,240],
  [68, 49, 48, 41, 57, 61, 69,393],
]

function scoreRegionsByDayOfWeek(index) {
  const unnormal = number_of_crashes_per_day_of_week_by_region.map( (region_week) => {
    return region_week[index];
  });

  const sum = unnormal.reduce( (a,b) => a+b, 0 ); 
  const normalized = unnormal.map( (a) => a / sum );
  const largest = normalized.reduce( (a,b) => a > b ? a : b, normalized[0]);
  const scaled = normalized.map( (a) => a * 1/largest );

  return scaled;
}

function scaledCrashesByHour() {
  const sum = number_of_crashes_by_hour_of_day.reduce( (a,b) => a+b, 0 ); 
  const normalized = number_of_crashes_by_hour_of_day.map( (a) => a / sum );
  const largest = normalized.reduce( (a,b) => a > b ? a : b, normalized[0]);
  const scaled = normalized.map( (a) => a * 1/largest );

  return scaled;
}


function scaledInjuriesByMonth() {
  const sum = number_of_injured_persons_per_month_per_year.reduce( (a,b) => a+b, 0 ); 
  const normalized = number_of_injured_persons_per_month_per_year.map( (a) => a / sum );
  const largest = normalized.reduce( (a,b) => a > b ? a : b, normalized[0]);
  const scaled = normalized.map( (a) => a * 1/largest );

  return scaled;
}

const crash_targets = [
  "Cyclist", 
  "Tyre-Burst",
  "Animal collisions",
  "Pedestrians",
  "Roll-overs",
  "Collisions",
  "Fixed objects collisions",
  "Fell/Jumped from moving vehicle",
  "Others",
  "Grand Total"];

const crashed_with_target_by_region = [
  [10,1,37,17,9,4,3,81],
  [21,4,6,108,182,116,17,8,16,478],
  [6,3,13,19,99,23,6,2,5,176],
  [5,5,5,24,60,12,3,5,119],
  [6,1,10,55,43,27,9,2,12,165],
  [43,4,12,594,221,599,58,15,68,1614],
  [2,4,6,7,56,4,1,4,3,87],
  [4,2,6,34,48,39,11,9,3,156],
  [1,11,15,46,5,2,3,2,85],
  [3,6,30,71,34,8,17,7,176],
  [9,1,6,119,79,115,14,8,13,364],
  [2,17,39,96,61,8,4,13,240],
  [7,10,42,49,192,72,8,1,12,393],
  ];

const vehicle_types = [
  "Bus", 
  "Motorcycle", 
  "Pick-up", 
  "Sedan", 
  "SUV", 
  "Van", 
  "Truck", 
  "Unknown", 
  "Other", 
  "Total"
];

const vehicle_type_by_region = [
  [1 ,1 ,36 ,39 ,4 ,0,1 ,8 ,1 ,91],
  [12 ,19 ,191 ,308 ,34 ,2 ,36 ,29 ,1 ,632],
  [9 ,5 ,85 ,70 ,17 ,1 ,8 ,10 ,1 ,206],
  [10 ,5 ,43 ,43 ,12 ,2 ,7 ,9 ,3 ,134],
  [6 ,3 ,58 ,86 ,15 ,0,7 ,23 ,1 ,199],
  [93 ,46 ,467 ,1350 ,86 ,9 ,105 ,197 ,1 ,2354],
  [3 ,1 ,53 ,19 ,3 ,1 ,6 ,6 ,0,92],
  [4 ,2 ,78 ,99 ,4 ,0,5 ,7 ,1 ,200],
  [2 ,1 ,48 ,28 ,2 ,0,2 ,8 ,0,91],
  [2 ,1 ,142 ,61 ,2 ,0,3 ,2 ,4 ,217],
  [16 ,5 ,198 ,233 ,12 ,1 ,15 ,20 ,2 ,502],
  [15 ,0,149 ,101 ,10 ,3 ,23 ,6 ,3 ,310],
  [32 ,4 ,170 ,201 ,13 ,3 ,42 ,24 ,1 ,490],
]
