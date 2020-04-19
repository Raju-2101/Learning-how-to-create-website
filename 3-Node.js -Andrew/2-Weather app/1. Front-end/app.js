const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// 37.8267,-122.4233
if (process.argv[2]) {
  geocode(process.argv[2], (err, { latitude, longitude, location }) => {
    if (err) {
      console.log(err);
    } else {
      forcast(latitude, longitude, location, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    }
  });
} else {
  console.log("ass hole");
}
