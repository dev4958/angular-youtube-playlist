'use strict';

import { TimelineMax } from 'gsap';

export default class controller {
  $onInit() {
    this.showComponent = true;
    this.subComponentAnimating = false;
  }
  $onDestroy() {
    this.showComponent = null;
    this.subComponentAnimating = null;
  }
  toggle() {
    if (!this.subComponentAnimating) this.showComponent = !this.showComponent;
  }
  updateShowComponent(event) {
    this.showComponent = event.showComponent;
  }
  updateSubComponentAnimating(event) {
    this.subComponentAnimating = event.subComponentAnimating;
  }
}
