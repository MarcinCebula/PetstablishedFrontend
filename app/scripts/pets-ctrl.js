'use strict';

angular.module('petstablished')
  .controller('PetsCtrl', ['$scope', '$http', '$state', '$stateParams', 'env', function ($scope, $http, $state, $params, env) {
    $scope.pagination = {
      page: 1
    }
    $scope.shelter = {}
    $scope.pets = {}
    $scope.setupCrumbs = function() {
      $scope.breadcrumbs = [{
        state: 'integrate.form',
        name: 'Home',
        params: {},
        active: false
      }, {
        state: 'shelters.index',
        name:  'Shelters',
        params: {},
        active: false
      }, {
        state: 'pets.index',
        name: $scope.shelter.name,
        params: {},
        active: true
      }]
    }
    $http.get(env.api + '/shelter/' + $params.shelterUrlId +'/pets', {
      params: {
        page: $scope.pagination.page
      }
    }).success(function(data, status, headers, config) {
      $scope.shelter = data.shelter_and_pets.shelter;
      $scope.pets = data.shelter_and_pets.pets;
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      // alert(data.error)
    });
  }]);
