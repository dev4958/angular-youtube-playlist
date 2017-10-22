'use strict';

// Native Node Modules
const path = require('path');

// NPM Modules
const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;
const debug = require('debug');

// Local Modules
const appServer = require(path.join(__dirname, '..', 'server.js'));

describe('Youtube Playlist Resource Server REST API', () => {
  let port = process.env.PORT || 5000, server = null;
  before((done) => {
    server = appServer.listen(port, () => {
      debug(`Resource server now running on port ${port}.`);
      done();
    });
  });
  it('Should be able to retrieve the Youtube API JSON feed.', (done) => {
    chai.request(`localhost:${port}`).get('/api/youtube-playlist-feed').end((err, res) => {
      expect(err).to.equal(null);
      expect(typeof res.body === 'object').to.equal(true);
      expect(res.body.kind === 'youtube#playlistItemListResponse').to.equal(true);
      done();
    });
  });
  after((done) => {
    server.close();
    done();
  });
});
