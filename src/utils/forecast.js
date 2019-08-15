const request = require('request')

const forecast = (latitude, longitude, callback) => {
  let url = `https://api.darksky.net/forecast/f1f6a3eb066543788f6003eacb2651c0/${latitude},${longitude}`
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services');
    }
    else if (body.error) {
      callback('Unable to find location');
    } else {
      console.log(body.daily.data[1]);
      let precipProb = body.currently.precipProbability;
      let currentTemp =  body.currently.temperature;
      let summary = body.daily.data[0].summary;
      let tomorrowHigh = body.daily.data[1].temperatureMax;
      let tomorrowLow = body.daily.data[1].temperatureMin;
      let currentWeather = `It is currently ${currentTemp} degrees out.  
      There is a ${precipProb}% chance of rain. The forecast for tomorrow is a \n
      high of ${tomorrowHigh} and a low of ${tomorrowLow}.`
      callback(undefined, {
        precipProb,
        currentTemp,
        summary,
        currentWeather
      })
    }
  })
};

module.exports = forecast;