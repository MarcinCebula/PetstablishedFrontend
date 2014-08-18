'use strict';
angular.module('petstablished')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/integrate/form');

    $stateProvider
    .state('integrate', {
      url: '/integrate',
      abstract: true,
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'body': { templateUrl: 'partials/integration.html' }
      }
    })
    .state('integrate.form', {
      url: '/form',
      views: {
        'navigation.steps': { templateUrl: 'partials/integration/integration-form.html' }
      }
    })
    .state('integrate.preview', {
      url: '/preview',
      views: {
        'navigation.steps': { templateUrl: 'partials/integration/preview.html' }
      }
    })
    .state('shelters', {
      url: '/shelters',
      abstract: true,
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'body': { templateUrl: 'partials/shelters.html' },
      }
    })
    .state('shelters.index', {
      url: '/index',
      views: {
        'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
        'shelters.pages': { templateUrl: 'partials/shelters/index.html' }
      }
    })
    .state('pets', {
      url: '/shelters/:shelterUrlId/pets',
      abstract: true,
      views: {
        'navigation': { templateUrl: 'partials/navigation.html' },
        'body': {
          controller: 'PetsCtrl',
          templateUrl: 'partials/pets.html'
        },
      }
    })
    .state('pets.index', {
      url: '/index',
      views: {
        'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
        'pets.pages': { templateUrl: 'partials/pets/index.html' }
      }
    })
    .state('pets.view', {
      url: '/:petId/view',
      views: {
        'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
        'pets.pages': { templateUrl: 'partials/pets/show.html' }
      }
    })

  }]);
