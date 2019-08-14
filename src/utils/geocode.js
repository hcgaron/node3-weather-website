const request = require('request');

const geocode = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiaGNnYXJvbiIsImEiOiJjano3c2d5NG8wd2J5M21ta2UwdG94ajdpIn0.Sn2AH4Ipk12Pnfeb4ggMDg&limit=1`
    request({
      url,
      json: true
    }, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location services', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find location.  Try another search', undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
      }
    })
  }
  
  module.exports = geocode;