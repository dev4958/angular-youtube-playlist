'use strict'

export default {
  name: 'api',
  service: function($http) {
    this.youtubePlaylistFeed = () => $http.get('/api/youtube-playlist-feed', {})
  }
}
