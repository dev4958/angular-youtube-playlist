'use strict';

export default {
  name: 'api',
  service: function($http) {
    this.youtubePlaylistFeed = function() {
      return $http.get('/api/youtube-playlist-feed', {});
    }
  }
}
