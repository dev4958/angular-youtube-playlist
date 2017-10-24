'use strict';

// NPM Modules
import angular from 'angular';
import uirouter from 'angular-ui-router';

// Console Message
console.log("%c\nAngularJS Youtube Playlist\n%cRenders videos in a Youtube playlist.\n\n","padding: 0; color:#000000; line-height:30px; font-size: 18px; font-family:'Helvetica',sans-serif;","padding:0px;color:#000000;line-height:20px;font-size:12px;font-family:'Helvetica',sans-serif;")

// Global Styling
import style from '../css/style.sass';

// Routing Configuration
import routingConfig from './lib/routingConfig';

// Components
import components from './lib/components/'

// Services
import services from './lib/services/';

const addComponents = (app, components) => {
  for (let i = 0; i < components.length; i++) {
    app.component(components[i].name, components[i].component);
    if (components[i].hasOwnProperty('animations')) for (let i = 0; i < components[i].animations.length; i++) app.animation(components[i].animations[i].class, components[i].animations[i].animation);
  }
};

const addServices = (app, services) => {
  for (let i = 0; i < services.length; i++) app.service(services[i].name, services[i].service);
};

// Application
const app = angular.module('app', [uirouter]).config(routingConfig);
addServices(app, services);
addComponents(app, components);
