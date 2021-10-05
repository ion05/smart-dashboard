const express = require("express");
const router = express.Router();

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const redirect_uri = "https://core-prelims.herokuapp.com/dashboard/calendar";
const scopes = ["https://www.googleapis.com/auth/calendar.readonly"];
const oAuth2Client = new OAuth2(
  process.env.CALENDAR_CLIENT_ID,
  process.env.CALENDAR_CLIENT_SECRET,
  redirect_uri
);

router.get("/", (req, res) => {
  const code = req.query.code;
  if (code !== null) {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return;
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
          if (err) return;
          const events = res.data.items;
          if (events.length) {
            events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
            });
          } else {
          }
        }
      );
    });
  }
  res.render("calendar");
});

router.post("/connect", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  console.log(authUrl);
  res.redirect(authUrl);
});
module.exports = router;
