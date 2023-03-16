const request = require("request");

let movieData = [];

request.get(
  "https://port-0-moviecrawl-9d7lbw2elczym3a7.gksl2.cloudtype.app/",
  function (err, response, body) {
    console.log(body);
    movieData = body;
  }
);

module.exports = movieData;
