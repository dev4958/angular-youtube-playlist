'use strict';

// NPM Modules
const debug = require('debug')('Angular Youtube Playlist (error.js):');

module.exports = exports = function(res, err, code, message) {
  debug(err);
  debug(`${code} error encountered while attempting to perform the request.`);
  return res.status(code).send(message);
};
