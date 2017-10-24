'use strict';

import * as angular from 'angular';

// Youtube Playlist Controller
import youtubePlaylistController from './components/youtubePlaylist/controller';

// Playlist View
import playlistStyling from './views/playlist/style.sass';
import playlist from './views/playlist/index.html';

// Summary View
import detailsStyling from './views/details/style.sass';
import details from './views/details/index.html';

export default function routingConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  const playlistState = {
    name: 'playlist',
    url: '/',
    template: playlist,
    controller: youtubePlaylistController
  }
  const detailsState = {
    name: 'details',
    url: '/details',
    template: details,
    controller: youtubePlaylistController
  }
  $stateProvider.state(playlistState);
  $stateProvider.state(detailsState);
}
