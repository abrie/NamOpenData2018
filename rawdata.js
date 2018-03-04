const hour_labels = [
  "00:00 - 01:59",
  "02:00 - 03:59",
  "04:00 - 05:59",
  "06:00 - 07:59",
  "08:00 - 09:59",
  "10:00 - 11:59",
  "12:00 - 13:59",
  "14:00 - 15:59",
  "16:00 - 17:59",
  "18:00 - 19:59",
  "20:00 - 21:59",
  "22:00 - 23:59",
]

const csv_agegroup_male_female_unknown_total = [
  "0 to 5,21, 17, 1,39",
  "6 to 10,13, 11, 0,24",
  "11 to 15,10, 7 ,0,17",
  "16 to 20,26, 13, 0,39",
  "21 to 25,71, 25, 1,97",
  "26 to 30,68, 20, 0,88",
  "31 to 35,74, 21, 0,95",
  "36 to 40,65, 9, 0,74",
  "41 to 45,46, 14, 0,60",
  "46 to 50,32, 15, 0,47",
  "51 to 55,27, 9, 1,37",
  "56 to 60,25, 8, 0,33",
  "61 to 65,16, 10, 0,26",
  "66 to 70,11, 5 ,0,16",
  "71+,10, 9, 0,19",
  "Unknown,11, 4, 5,20",
];

function splitAndTrim(line) {
    var parts = line.split(",");
    return parts.map( (part) => part.trim() )
}

function getMaleFatalitiesByAgeGroup() {
  csv_agegroup_male_female_unknown.map( (line) => {
    let parts = splitAndTrim(line);
    return {group:parts[0], fatalities:parts[1]}
  });
}

function getAgeGroups() {
  return csv_agegroup_male_female_unknown_total.map( (line) => {
    let parts = splitAndTrim(line);
    return parts[0]; 
  });
}
