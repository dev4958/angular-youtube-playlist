'use strict';

import angular from 'angular';
import { TimelineMax } from 'gsap';

export default class controller {
  constructor($element) {
    this.$onInit($element);
  }
  $onInit(element) {
    if (element) this.image = element.children();
  }
  $onChanges(changes) {
    if (changes.showComponent) {
      this.showComponent = angular.copy(this.showComponent);
      this.showComponent = angular.copy(changes.showComponent.currentValue);
    }
  }
  $onDestroy() {
    this.timeline = null;
  }
  fadeIn(element, cb) {
    (new TimelineMax()).to(element, 1, { opacity: 1, onComplete: cb });
  }
  fadeOut(element, cb) {
    (new TimelineMax()).to(element, 1, { opacity: 0, onComplete: cb });
  }
  save() {
    this.onUpdate({
      $event: {
        showComponent: this.showComponent
      }
    });
  }
}
