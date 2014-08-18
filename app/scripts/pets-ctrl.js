'use strict';

angular.module('petstablished')
  .controller('PetsCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $params) {
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
        name: $scope.shelter.name,
        params: { url_id: $scope.shelter.url_id },
        active: false
      }, {
        state: 'pets.index',
        name: 'Pets',
        params: {},
        active: true
      }]
    }
    $http.get('http://petstablishedserver.9wavelabs.com/api/shelter/' + $params.shelterUrlId +'/pets', {
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
