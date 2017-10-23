'use strict';

// NPM Modules
import angular from 'angular';
import ngAnimate from 'angular-animate';
import uirouter from 'angular-ui-router';

// Console Message
console.log("%c\nAngularJS Youtube Playlist\n%cRenders videos in a Youtube playlist.\n\n","padding: 0; color:#000000; line-height:30px; font-size: 18px; font-family:'Helvetica',sans-serif;","padding:0px;color:#000000;line-height:20px;font-size:12px;font-family:'Helvetica',sans-serif;")

// Style
import css from '../css/style.scss';

// Routing Configuration
import routingConfig from './lib/routingConfig';

// Services
// import Resources from './lib/services/Resources';

// Components
import application from './lib/components/application/';
import animatedImage from './lib/components/animatedImage/';

const addComponent = (app, componentData) => {
  app.component(componentData.name, componentData.component);
  if (componentData.hasOwnProperty('animations')) {
    for (let i = 0; i < componentData.animations.length; i++) {
      app.animation(componentData.animations[i].class, componentData.animations[i].animation);
    }
  }
};

// Application
const app = angular.module('app', [uirouter, ngAnimate]).config(routingConfig);
addComponent(app, application);
addComponent(app, animatedImage);
