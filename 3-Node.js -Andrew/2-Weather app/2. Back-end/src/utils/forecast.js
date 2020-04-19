const request = require("request");

const forcast = (latitude, longitude, location, callback) => {
  const url = `https://api.darksky.net/forecast/65769f5665cf67d31ea51b29cc10f399/${latitude},${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to access weather information");
    } else if (body.error) {
      callback("unable to access weather information");
    } else {
      callback(
        undefined,
        ` ${location}. ${body.daily.data[0].summary} It is currently ${body.currently.temperature} degree and precption is ${body.currently.precipProbability}.`
      );
    }
  });
};

module.exports = forcast;
