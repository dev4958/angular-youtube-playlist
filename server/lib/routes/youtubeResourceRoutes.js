'use strict';

// Native Node Modules
const path = require('path');

// NPM Modules
const express = require('express');
const request = require('request');
const debug = require('debug')('Angular Youtube Playlist (youtubeResourceRoutes.js):');
const moment = require('moment');

// Local Modules
const error = require(path.join(__dirname, '..', 'utilities', 'error.js'));

let youtubeResourceRouter = new express.Router();

youtubeResourceRouter.get('/youtube-playlist-feed', (req, res) => {
  debug(`GET request to "/youtube-playlist-feed" begun.`);
  debug(`Proceeding to query Youtube API for playlist data.`);
  let url = process.env.YOUTUBE_API_PLAYLIST_FEED || `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=50&playlistId=PLhI0-MxjENx6pxSM_LmwRNu1R5AKArpPP&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw`;
  debug(`Youtube API Playlist Feed URL: ${url}`);
  request(url, function (err, response, body) {
    if (err) return error(res, err, 500, `Internal server error, your request for the Youtube playlist's feed could not be completed.`);
    debug(`GET request to Youtube API for playlist: ${response.statusCode}`);
    debug(`Successfully retrieved Youtube playlist feed data.`);
    try {
      body = JSON.parse(body);
      debug(`Feed data is correctly formatted JSON.`);
      debug(`GET request to "/youtube-playlist-feed" ending, now sending data to the client.`);
      return res.status(200).json(formatPlaylistData(body));
    } catch(e) {
      debug(`Feed data is malformed JSON.`);
      if (err) return error(res, err, 400, `Malformed response returned by the Youtube API, your request for the Youtube playlist's feed could not be completed.`);
    }
  });
});

const formatPlaylistData = (data) => {
  data = data.items;
  debug(data.length);
  let output = [];
  for (let i = 0; i < data.length; i++) {
    let video = data[i];
    let videoData = {
      name: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('title') ? video['snippet']['title'].replace(/\\/g, '') : null,
      thumbnailUrl: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('thumbnails') && video['snippet']['thumbnails'].hasOwnProperty('high') && video['snippet']['thumbnails']['high'].hasOwnProperty('url') ? video['snippet']['thumbnails']['high']['url'] : null,
      thumbnailWidth: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('thumbnails') && video['snippet']['thumbnails'].hasOwnProperty('high') && video['snippet']['thumbnails']['high'].hasOwnProperty('width') ? video['snippet']['thumbnails']['high']['width'] : null,
      thumbnailHeight: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('thumbnails') && video['snippet']['thumbnails'].hasOwnProperty('high') && video['snippet']['thumbnails']['high'].hasOwnProperty('height') ? video['snippet']['thumbnails']['high']['height'] : null,
      videoUrl: video.hasOwnProperty('contentDetails') && video['contentDetails'].hasOwnProperty('videoId') ? `https://www.youtube-nocookie.com/embed/${video['contentDetails']['videoId']}?rel=0` : null,
      publishDate: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('publishedAt') ? formatPublishDate(video['snippet']['publishedAt']) : null,
      description: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('description') ? video['snippet']['description'].replace(/\\/g, '').replace(/\n/g, '') : null,
      descriptionShort: video.hasOwnProperty('snippet') && video['snippet'].hasOwnProperty('description') ? formatShortDescription(video['snippet']['description'].replace(/\\/g, '').replace(/\n/g, '')) : null,
      videoId: video.hasOwnProperty('contentDetails') && video['contentDetails'].hasOwnProperty('videoId') ? video['contentDetails']['videoId'] : null,
    };
    if (videoData.name !== 'Deleted video' && videoData.description !== 'This video is unavailable.') output.push(videoData);
  }
  return output;
};

const formatPublishDate = (date) => {
  let month = moment(date).format('MMMM').substr(0, 3);
  let dayAndYear = moment(date).format('Do, YYYY');
  return `${month} ${dayAndYear}`;
}

const formatShortDescription = (description, characterLimit = 240) => {
  description = description.split(' ');
  let characterCounter = 0, wordIndex = 0;
  for (let i = 0; i < description.length; i++) {
    characterCounter += description[i].split('').length + 1;
    if (characterCounter >= characterLimit) {
      wordIndex = i - 1;
      break;
    }
  }
  description = `${description.slice(0, wordIndex).join(' ').toString()}`;
  if (description.length !== 0) description = `${description}...`;
  return description;
}

module.exports = youtubeResourceRouter;
