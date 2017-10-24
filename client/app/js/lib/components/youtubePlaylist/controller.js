'use strict';

import angular from 'angular';
import { TweenMax, TimelineMax } from 'gsap';

export default class controller {
  constructor($element, $sce, api) {
    this.content = $element.children();
      this.first = true;
      (new TimelineMax({})).set(this.content, { opacity: 0 });
      if (document.getElementById('loader')) (new TimelineMax({})).to('#loader', 0.5, { opacity: 0, ease: Linear.easeIn, onComplete: function() {
        if (document.getElementById('loader')) document.getElementById('loader').remove();
      }})
      api.youtubePlaylistFeed().then((response) => {
        this.playlist = response.data;
        this.trustAsResourceUrl = $sce.trustAsResourceUrl;
        this.setCurrentVideo(this.playlist[0]['videoId']);
      });
  }
  $onChanges(changes) {
    if (changes.showComponent) {
      this.showComponent = angular.copy(this.showComponent);
      this.showComponent = angular.copy(changes.showComponent.currentValue);
    }
  }
  $onDestroy() {
    this.content = null;
    this.playlist = null;
    this.currentVideo = null;
    this.trustAsResourceUrl = null;
  }
  setCurrentVideo(videoId) {
    (new TimelineMax({})).set(this.content, { opacity: 0 });
    for (let i = 0; i < this.playlist.length; i++) {
      if (this.playlist[i].videoId === videoId) {
        (new TimelineMax({})).to(this.content, 0.25, { opacity: 1, ease: Linear.easeOut })
        this.currentVideo = this.playlist[i];
        this.currentVideo.trustedVideoUrl = this.trustAsResourceUrl(this.currentVideo.videoUrl);
        break;
      }
    }
  }
}
