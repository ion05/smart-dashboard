const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_TOKEN;
const client = require("twilio")(accountSid, authToken);
const https = require("https");
const { connect } = require("http2");
// controller imports
const spotifyApi = require("../routes/spotifyRoute");
const { getWeather } = require("../controllers/weatherController");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const redirect_uri = "https://core-prelims.herokuapp.com/dashboard/calendar";
const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
const oAuth2Client = new OAuth2(
  process.env.CALENDAR_CLIENT_ID,
  process.env.CALENDAR_CLIENT_SECRET,
  redirect_uri
);
let mapData = null;
let calenderData = null;
router.get("/", ensureAuthenticated, async (req, res) => {
  const weather = await getWeather();
  console.log(weather);
  let spotifyData = null;
  let playing = false;

  const code = req.query.code;
  if (code !== null) {
    await spotifyApi.spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body.access_token;
        const refresh_token = data.body.refresh_token;
        spotifyApi.spotifyApi.setAccessToken(access_token);
        spotifyApi.spotifyApi.setRefreshToken(refresh_token);
        spotifyApi.spotifyApi.getMyCurrentPlaybackState().then(
          function (data) {
            if (data.body && data.body.is_playing) {
              spotifyData = data.body;
              playing = true;
            } else {
              spotifyData = data.body;
              playing = false;
            }
            res.render("dashboard", {
              user: req.user,
              spotifyData: spotifyData,
              playing: playing,
              weather: weather,
              events: calenderData,
              map: mapData,
            });
          },
          function (err) {
            console.log("Something Went Wrong", err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
    // spotifyApi.spotifyApi.setAccessToken(code);
  } else {
    console.log("i am here");
    res.render("dashboard", {
      user: req.user,
      spotifyData: spotifyData,
      playing: playing,
      weather: weather,
      events: calenderData,
      map: mapData,
    });
  }
});
// router.get("/weather", ensureAuthenticated, async (req, res) => {
//     const weather = await getWeather()
//     res.json(weather)
// })
router.get("/call", ensureAuthenticated, (req, res) => {
  res.render("call");
});
router.post("/call/make", (req, res) => {
  const number = process.env.TWILLIO_PHONE;
  client.calls
    .create({
      twiml:
        "<Response><Say>Hello. This is test call from RSS motors.</Say></Response>",
      to: req.body.number,
      from: number,
    })
    .then((call) => console.log(call.sid));
  res.redirect("/dashboard");
});
router.get("/crash", ensureAuthenticated, (req, res) => {
  const currentUser = req.user;
  const emergencyContact = currentUser.emergencyContact;
  const number = process.env.TWILLIO_PHONE;
  console.log(emergencyContact, number);
  client.calls
    .create({
      twiml: `<Response><Say>This is an automated from RSS Motors. ${currentUser.username} with model number ${currentUser.modelNumber} was involved in a car accident at location xyz. Emergency services have already been alerted. Please visit the location or contact services for further details</Say></Response>`,
      to: emergencyContact,
      from: number,
    })
    .then(res.send("ok and?"))
    .then((call) => console.log(call.sid));

  // commented out for now
  //   client.calls
  //   .create({
  //      twiml: `<Response><Say>Demo Message to hospital</Say></Response>`,
  //      to: "101",
  //      from: number
  //    })
  //    .then(res.send("alerted emergency contacts"))
  //   .then(call => console.log(call.sid));
});

router.get("/profile", ensureAuthenticated, (req, res) => {
  const currentUser = req.user;
  console.log(currentUser);
  res.render("profile", { user: currentUser });
});

router.get("/calendar", ensureAuthenticated, (req, res) => {
  const code = req.query.code;
  const eventData = null;
  if (code !== null) {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error Retrieveing code", err);
      oAuth2Client.setCredentials(token);
      const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
      calendar.events.list(
        {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        },
        (err, res) => {
          if (err) return console.log("The API returned an error: " + err);
          const events = res.data.items;
          if (events.length) {
            //   console.log('Upcoming 10 events:');
            //   events.map((event, i) => {
            //     const start = event.start.dateTime || event.start.date;
            //     console.log(`${start} - ${event.summary}`);
            //   });\
            calenderData = events;
            console.log(events);
          } else {
            console.log("No upcoming events found.");
          }
        }
      );
    });
  }
  res.redirect("/dashboard");
});
router.get("/calendar/connect", (req, res) => {
  console.log("Reached Here");
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  console.log(authUrl);
  res.redirect(authUrl);
});
router.post("/map/getloc", async (req, res) => {
  // geocoding
  start = req.body.start;
  end = req.body.end;
  api_key = process.env.MAP_API_KEY;
  let start_co = "";
  let end_co = "";
  const url_start =
    "https://geocode.search.hereapi.com/v1/geocode?q=" +
    start +
    "&apiKey=" +
    api_key;
  console.log(url_start);
  await https.get(url_start, function (response) {
    response.on("data", async function (data) {
      const startdata = JSON.parse(data);
      start_lat = startdata.items[0].position.lat;
      start_lng = startdata.items[0].position.lng;
      start_co = start_lat + "," + start_lng;
      console.log(start_co);
      const url_end =
        "https://geocode.search.hereapi.com/v1/geocode?q=" +
        end +
        "&apiKey=" +
        api_key;
      console.log(url_end);
      https.get(url_end, function (response) {
        response.on("data", function (data) {
          const endData = JSON.parse(data);

          end_lat = endData.items[0].position.lat;
          end_lng = endData.items[0].position.lng;
          end_co = end_lat + "," + end_lng;
          console.log(end_co);
          url_nav =
            "https://router.hereapi.com/v8/routes?transportMode=car&origin=" +
            start_co +
            "&destination=" +
            end_co +
            "&apiKey=" +
            api_key +
            "&return=summary,actions,instructions,polyline";
          console.log(url_nav);
          https.get(url_nav, function (response) {
            console.log(response.statusCode);
            response.on("data", function (data) {
              const navData = JSON.parse(data);
              // console.log(navData['routes'][0]['sections'][0]['actions'])
              mapData = navData;
              res.redirect("/dashboard");
            });
          });
        });
      });
    });
  });

  // navigation

  // res.redirect('/dashboard')
});
module.exports = router;
