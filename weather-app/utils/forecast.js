const request =  require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, lng, callback) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBXigtiLN2EZnadwvD_gbm5zrPVVs-aBg&latlng=${lat},${lng}`;

  request({url, json: true}, (error, response) => {
    if (error){
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.error_message) {
      callback('Unable to find location try another search', undefined);
    } else {

      callback(undefined, `Clear throughout the day. It is currently ... i cant tell you the forecast based on geolocation because weatherstack unabled it`);
    }
  });
};


module.exports = forecast;
