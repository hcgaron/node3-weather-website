const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for EXPRESS config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// configure routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Hans',
  })
})

// about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'ABOUT',
    name: 'Hans'
  })
})

// help
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Dynamic HELP page',
    helpMsg: 'This is a help message for you',
    title: 'Help',
    name: 'Hans'
  })
})

// weather
app.get('/weather', (req, res) => {
  const location = req.query.address;
  // console.log(req.query.address)
  if (!location) {
    return res.send({
      error: 'Address must be provided '
    })
  }
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, { summary, currentWeather }) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: summary + ' ' + currentWeather,
        address: req.query.address,
        location

      })
    }

    )
  })
})














//
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a serach term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
})














// help subdir 404
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found',
    name: 'Hans'
  })
})

// 404 router -- MUST be last route
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: "Page not found",
    name: 'Hans'
  })
})


// set server listening
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})