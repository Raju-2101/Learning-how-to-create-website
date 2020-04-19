const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoicmFqdXJhcHBlciIsImEiOiJjazgxemcza2IwMXpvM2dueXVxdTNkZzE4In0.sM_48KSGSyAOyBFNu5lRWQ`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to access weather information");
    } else if (body.features.length === 0) {
      callback("unable to access weather information");
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
