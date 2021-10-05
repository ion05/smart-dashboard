const spotifyApi = require("../routes/spotifyRoute");
const spotifyData = null;

const spotifyAuth = async (req, res, next) => {
  var code = req.query.code;
  if (req.query.code !== null) {
    var code = req.query.code;

    await spotifyApi.spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body.access_token;
        const refresh_token = data.body.refresh_token;
        spotifyApi.spotifyApi.setAccessToken(access_token);
        spotifyApi.spotifyApi.setRefreshToken(refresh_token);
      })
      .catch((err) => {});
    // spotifyApi.spotifyApi.setAccessToken(code);
    spotifyApi.spotifyApi.getMyCurrentPlaybackState().then(
      function (data) {
        if (data.body && data.body.is_playing) {
          res.render("index");
        } else {
          res.render("index");
        }
      },
      function (err) {}
    );
  } else {
    res.render("index");
  }
};

module.exports = {
  spotifyAuth,
};
