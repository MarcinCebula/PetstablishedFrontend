'use strict';
angular.module('petstablished')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/integrate');

    $stateProvider
    .state('integrate', {
      url: '/integrate',
      abstract: true,
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'body': { templateUrl: 'partials/integration.html' }
      }
    })
    .state('integrate.request', {
      url: '/request',
      views: {
        'navigation.steps': { templateUrl: 'partials/integration/integration-form.html' }
      }
    })
    .state('shelters', {
      url: '/shelters',
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'body': { templateUrl: 'partials/shelters/index.html' }
      }
    })
    .state('pets', {
      url: '/shelters/:petid/pets',
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
        'body': { templateUrl: 'partials/pets/index.html' }
      }
    })
  }]);
