'use strict';

// Native Node Modules
const path = require('path');

// NPM Modules
const express = require('express');
const debug = require('debug')('Angular Youtube Playlist (server.js):');
const helmet = require('helmet');

// Local Modules
const youtubeResourceRoutes = require(path.join(__dirname, 'lib', 'routes', 'youtubeResourceRoutes.js'));

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'i.ytimg.com'],
    frameSrc: ['www.youtube-nocookie.com'],
    fontSrc: ['fonts.gstatic.com']
  }
}));
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

app.use((req, res, next) => {
  // Allow localhost development with the client running on another port.
  if (!process.env.PRODUCTION) res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.get('*.js', (req, res, next) => {
  let queryStringCheck = req.url.indexOf('?');
  debug(`Request to .js file (${req.url}).  Will return as: ${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`);
  req.url = `${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.get('*.html', (req, res, next) => {
  let queryStringCheck = req.url.indexOf('?');
  debug(`Request to .html file (${req.url}).  Will return as: ${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`);
  req.url = `${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/html');
  next();
});
app.get('*.css', (req, res, next) => {
  let queryStringCheck = req.url.indexOf('?');
  debug(`Request to .css file (${req.url}).  Will return as: ${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`);
  req.url = `${req.url.substr(0, queryStringCheck !== -1 ? queryStringCheck : req.url.length)}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.use('/api', youtubeResourceRoutes);
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/details', express.static(path.join(__dirname, 'build')));
app.use('*', express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 5000;
module.exports = exports = app.listen(port, () => debug(`Resource server now running on port ${port}.`));

process.on('uncaughtException', () => debug(`Uncaught exception from AngularJS Youtube Playlist resource server on port ${port}.`));
