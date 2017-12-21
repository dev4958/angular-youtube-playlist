'use strict';

import angular from 'angular'

export default class controller {
  constructor($element, $sce, api) {
    this.content = $element.children()
      this.first = true
      api.youtubePlaylistFeed().then((response) => {
        this.playlist = response.data
        this.trustAsResourceUrl = $sce.trustAsResourceUrl
        this.setCurrentVideo(this.playlist[0]['videoId'])
      })
  }
  $onChanges(changes) {
    if (changes.showComponent) {
      this.showComponent = angular.copy(this.showComponent)
      this.showComponent = angular.copy(changes.showComponent.currentValue)
    }
  }
  $onDestroy() {
    this.content = null
    this.playlist = null
    this.currentVideo = null
    this.trustAsResourceUrl = null
  }
  setCurrentVideo(videoId) {
    for (let i = 0; i < this.playlist.length; i++) {
      if (this.playlist[i].videoId === videoId) {
        this.currentVideo = this.playlist[i]
        this.currentVideo.trustedVideoUrl = this.trustAsResourceUrl(this.currentVideo.videoUrl)
        break
      }
    }
  }
}
