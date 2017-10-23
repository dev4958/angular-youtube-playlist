'use strict';

import { TimelineMax } from 'gsap';

import controller from './controller';
import template from './template/template.html';

export default {
  name: 'application',
  component: {
    controller: controller,
    template: template
  }
}
