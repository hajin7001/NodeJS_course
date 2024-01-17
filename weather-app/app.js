const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

// const connectToAPI = () => {
//   const url = 'http://api.weatherstack.com/current';
//   const qs = { access_key: 'dfbee35cb9ee130031bdd7ee233c63b9', query: "Seoul", units: "f"};

//   request({url, qs, json:true}, 
//     (error, response, body) => { 
//       if(error) { console.log(`Error connecting to API: ${error}`); }
//       else{
//         console.log(`It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`);
//       }}
//     );
// }
// //connectToAPI();

const location = process.argv[2];

// 주로 이렇게 error, data의 쌍으로 간다 
geocode(location, (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
  forecast(data.latitude, data.longitude, (error, {latitude, longitude}) => {
    console.log('Error', error);
    console.log('Data', latitude, longitude);
  })
});

