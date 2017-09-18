const data=[{
    "id": 1,
    "first_name": "Abagael",
    "last_name": "Kubin",
    "gender": "Female"
  }, {
    "id": 2,
    "first_name": "Tedmund",
    "last_name": "Blondell",
    "gender": "Male"
  }, {
    "id": 3,
    "first_name": "Fredek",
    "last_name": "Szanto",
    "gender": "Male"
  }, {
    "id": 4,
    "first_name": "Franz",
    "last_name": "Clewes",
    "gender": "Male"
  }, {
    "id": 5,
    "first_name": "Nicko",
    "last_name": "Fusedale",
    "gender": "Male"
  }, {
    "id": 6,
    "first_name": "Reagen",
    "last_name": "Hawtry",
    "gender": "Male"
  }, {
    "id": 7,
    "first_name": "Jarrid",
    "last_name": "Mc Mechan",
    "gender": "Male"
  }, {
    "id": 8,
    "first_name": "Billi",
    "last_name": "Bacchus",
    "gender": "Female"
  }, {
    "id": 9,
    "first_name": "Remy",
    "last_name": "Wythill",
    "gender": "Female"
  }, {
    "id": 10,
    "first_name": "Theresina",
    "last_name": "Cotta",
    "gender": "Female"
  }];


function sumAll(){
    var a=Array.from(arguments);
    return a.reduce((s,v) => s+v, 0);
}


//   let's say we have a group of people of different ages
const ages = [32, 15, 19, 12];
// Is there at least one adult in the group 
const adultPresent  = ages.some(n => n>18);
const allAdults = ages.every(n => n>18);


console.log(
    `Answer ${sumAll(1,2,3,4,5,6,7)}\n`
    , data.find(d => d.first_name==='Remy' )
    , data.findIndex(d => d.first_name==='Remy' )
    , `\nadultPresent: ${adultPresent}\n`
    , `allAdults: ${allAdults}\n`
);   