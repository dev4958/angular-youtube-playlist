'use strict';

import { TimelineMax } from 'gsap';

export default class controller {
  $onInit() {
    this.showComponent = true;
  }
  $onDestroy() {
    this.showComponent = null;
  }
  toggle() {
    this.showComponent = !this.showComponent;
  }
  updateShowComponent(event) {
    this.showComponent = event.showComponent;
  }

}
