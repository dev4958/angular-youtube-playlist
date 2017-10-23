'use strict';

import { TimelineMax } from 'gsap';

import style from './template/style.sass';
import template from './template/template.html';

import controller from './controller';
import animations from './animations/';

export default {
  name: 'animatedImage',
  component: {
    bindings: {
      showComponent: '<',
      onUpdate: '&',
      onSubComponentAnimatingUpdate: '&'
    },
    controller: controller,
    template: template
  },
  animations: animations
}
