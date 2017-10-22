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

// Add security configurations in production.  CSP specifics, given the specific application and application version in the "public" directory, may be needed...
if (process.env.PRODUCTION) {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  }));
  app.use(helmet.noCache());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}

app.use((req, res, next) => {
  // Allow localhost development with the client running on another port.
  if (!process.env.PRODUCTION) res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  next();
});

// If in production mode serve the application from the local "public" directory.
if (process.env.PRODUCTION) app.use(express.static(__dirname + '/public'));

app.use('/api', youtubeResourceRoutes);

const port = process.env.PORT || 5000;
if (process.env.PRODUCTION) app.listen(port, () => debug(`Resource server now running on port ${port}.`));

process.on('uncaughtException', () => debug(`Uncaught exception from AngularJS Youtube Playlist resource server on port ${port}.`));

module.exports = exports = app;
