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
        `It is currently ${body.currently.temperature} degree and precption is ${body.currently.precipProbability}. So it is ${body.daily.data[0].summary} in ${location}`
      );
    }
  });
};

module.exports = forcast;
