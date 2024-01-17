const request = require('request');

const geocode = (address, callback) => {
  const url = 
  'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBXigtiLN2EZnadwvD_gbm5zrPVVs-aBg&address=' + address;

  request({url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.error_message) {
      callback('Unable to find location try another search', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.results[0].geometry.location.lat,
        longitude: response.body.results[0].geometry.location.lng,
        location: response.body.results[0].geometry.location.location
      });
    }
  });

}



module.exports = geocode;
