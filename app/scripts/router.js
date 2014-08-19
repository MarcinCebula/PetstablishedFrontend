'use strict';
angular.module('petstablished')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
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
          templateUrl: 'partials/pets.html'
        },
      }
    })
      .state('pets.index-wrapper', {
        url: '',
        abstract: true,
        views: {
          'body': {
            controller: 'PetsCtrl',
            templateUrl: 'partials/pets/pets-wrapper.html'
          }
        },
      })
      .state('pets.view-wrapper', {
        url: '/:petId',
        abstract: true,
        views: {
          'body': {
            controller: 'PetCtrl',
            templateUrl: 'partials/pets/pets-wrapper.html'
          }
        },
      })
      .state('pets.edit-wrapper', {
        url: '/:petId',
        abstract: true,
        views: {
          'body': {
            controller: 'PetEditCtrl',
            templateUrl: 'partials/pets/pets-wrapper.html'
          }
        },
      })

      .state('pets.index-wrapper.index', {
        url: '/index',
        views: {
          'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
          'pets.pages': { templateUrl: 'partials/pets/index.html' }
        }
      })
      .state('pets.view-wrapper.view', {
        url: '/view',
        views: {
        'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
        'pets.pages': { templateUrl: 'partials/pets/show.html' }
      }
      })
      .state('pets.edit-wrapper.edit', {
        url: '/edit',
        views: {
          'breadcrumbs': { templateUrl: 'partials/breadcrumbs.html' },
          'pets.pages': { templateUrl: 'partials/pets/edit.html' }
        }
      })
  }]);
