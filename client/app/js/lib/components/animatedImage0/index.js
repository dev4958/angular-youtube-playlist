'use strict';

import { TimelineMax } from 'gsap';

import controller from './controller';
import template from './template/template.html';
import animations from './animations/';

export default {
  name: 'animatedImage',
  component: {
    bindings: {
      showComponent: '<',
      onUpdate: '&'
    },
    controller: controller,
    template: template
  },
  animations: animations
}
