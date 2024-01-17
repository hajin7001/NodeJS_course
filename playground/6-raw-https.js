const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=dfbee35cb9ee130031bdd7ee233c63b9&query=Seoul';

// 이런 과정이 불편하기 때문에 axios 같은걸 쓰는 거다. 

const request = http.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data = data + chunk.toString();
    console.log(chunk);
  });

  response.on('end', ()=>{
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', (error) => {
  console.log(error);
});

request.end();