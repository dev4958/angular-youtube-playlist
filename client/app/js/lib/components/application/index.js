'use strict';

import { TimelineMax } from 'gsap';

import style from './template/style.sass';
import template from './template/template.html';

import controller from './controller';

export default {
  name: 'application',
  component: {
    controller: controller,
    template: template
  }
}
