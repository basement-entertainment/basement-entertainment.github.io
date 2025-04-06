const functions = require("firebase-functions");
const express = require("express");
const request = require("request");

const app = express();

// Proxy endpoint
app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url; // Get the target URL from the query string
  if (!targetUrl) {
    return res.status(400).send("Missing 'url' query parameter");
  }

  // Forward the request to the target URL
  request(targetUrl).on("error", (err) => {
    res.status(500).send("Error fetching the URL: " + err.message);
  }).pipe(res);
});

// Export the app as a Firebase Function
exports.api = functions.https.onRequest(app);
