const request =  require('request');

// coordinates를 바탕으로 날씨를 알려준다 -> 근데 weatherstack가 바뀐 관계로 그렇게 할 수 없게 됨

// Callback function이
// (error, {latitude, longitude}) => {
//   console.log('Error', error);
//   console.log('Data', latitude, longitude);
// })

function forecast (lat, lon, callback) {
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6c7fbae243305cf2e2cd272bb90d8790`;

  // forecast의 callback function에서 돌아가서 나온 결과가 forecast를 호출한 것에 대한 return 값이 되는 건가? 

  request({url, json: true}, (error, response) => {
    if (error){
      callback('Unable to connect to location services!', undefined);
    } else if (response.body.message) {
      callback('Unable to find location try another search', undefined);
    } else {
      callback(undefined, {
        weather: response.body.weather[0].main
      });
    }
  });

};

module.exports = forecast;
