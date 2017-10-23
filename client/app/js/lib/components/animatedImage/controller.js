'use strict';

import angular from 'angular';
import { TimelineMax } from 'gsap';

export default class controller {
  constructor($element) {
    this.$onInit($element);
  }
  $onInit(element) {
    if (element) this.content = element.children();
    this.animating = false;
  }
  $onChanges(changes) {
    if (changes.showComponent) {
      this.showComponent = angular.copy(this.showComponent);
      this.showComponent = angular.copy(changes.showComponent.currentValue);
    }
  }
  $onDestroy() {
    this.timeline = null;
    this.content = null;
    this.animating = null;
  }
  fadeIn(element, cb) {
    if (!this.animating) {
      this.subComponentAnimating(true);
      (new TimelineMax()).to(element, 1, { opacity: 1, onComplete: () => {
        this.subComponentAnimating(false);
        cb();
      } });
    } else {
      cb();
    }
  }
  fadeOut(element, cb) {
    if (!this.animating) {
      this.subComponentAnimating(true);
      (new TimelineMax()).to(element, 1, { opacity: 0, onComplete: () => {
        this.subComponentAnimating(false);
        cb();
      } });
    } else {
      cb();
    }
  }
  save() {
    if (!this.animating) {
      this.onUpdate({
        $event: {
          showComponent: this.showComponent
        }
      });
    }
  }
  subComponentAnimating(bool) {
    this.animating = bool;
    this.onSubComponentAnimatingUpdate({
      $event: {
        subComponentAnimating: this.animating
      }
    })
  }
}
