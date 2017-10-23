'use strict';

import * as angular from 'angular';

routingConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routingConfig($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
