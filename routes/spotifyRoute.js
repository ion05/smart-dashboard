const express = require("express");
const router = express.Router();
// Spotify Get
const SpotifyWebApi = require("spotify-web-api-node");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "user-read-playback-state",
];
const showDialog = true;
const responseType = "token";
const spotifyApi = new SpotifyWebApi({
  redirectUri: REDIRECT_URI,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
const authorizeUrl = spotifyApi.createAuthorizeURL(
  scopes,
  showDialog,
  responseType
);
router.get("/spotify/connect", (req, res) => {
  res.redirect(authorizeUrl);
});

module.exports = { all: router, spotifyApi: spotifyApi };
