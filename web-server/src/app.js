const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: 'Daisy',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Daisy'
  })
})



app.get('/weather', (req, res) => {
  location = req.query.location;

  if(location) {
    geocode(location, (error, data) => {
      
      latitude = data.latitude;
      longitude = data.longitude;

      if (error) {
        return res.send({error})
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({error})
        }

        res.send({
          forecast: data.weather,
          location
        })
      })
    })
  }

  else {res.send({
    error: 'You must provide a location'})
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
})

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404',
    name: 'Daisy',
    message: 'Help Article not Found'
  })
})

// Match anything that hasnt matched any of the above
app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    name: 'Daisy',
    message: 'Page not found'
  })
});



app.listen(3000, () => {
  console.log('Server is up on port 3000')
});

