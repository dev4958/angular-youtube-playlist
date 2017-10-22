'use strict';

// Native Node Modules
const path = require('path');

// NPM Modules
const express = require('express');
const request = require('request');
const debug = require('debug')('Angular Youtube Playlist (youtubeResourceRoutes.js):');

// Local Modules
const error = require(path.join(__dirname, '..', 'utilities', 'error.js'));

let youtubeResourceRouter = new express.Router();

youtubeResourceRouter.get('/youtube-playlist-feed', (req, res) => {
  debug(`GET request to "/youtube-playlist-feed" begun.`);
  debug(`Proceeding to query Youtube API for playlist data.`);
  let url = process.env.YOUTUBE_API_PLAYLIST_FEED || `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;
  debug(`Youtube API Playlist Feed URL: ${url}`);
  request(url, function (err, response, body) {
    if (err) return error(res, err, 500, `Internal server error, your request for the Youtube playlist's feed could not be completed.`);
    debug(`GET request to Youtube API for playlist: ${response.statusCode}`);
    debug(`Successfully retrieved Youtube playlist feed data.`);
    try {
      body = JSON.parse(body);
      debug(`Feed data is correctly formatted JSON.`);
      debug(`GET request to "/youtube-playlist-feed" ending, now sending data to the client.`);
      return res.status(200).json(body);
    } catch(e) {
      debug(`Feed data is malformed JSON.`);
      if (err) return error(res, err, 400, `Malformed response returned by the Youtube API, your request for the Youtube playlist's feed could not be completed.`);
    }
  });
});

module.exports = youtubeResourceRouter;
