'use strict';

angular.module('petstablished')
  .controller('PetsCtrl', ['$scope', '$http', '$state', '$stateParams', 'env', function ($scope, $http, $state, $params, env) {
    $scope.pagination = {
      page: 1,
      limit: 20,
      count: 0,
      visible: false
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

    var calculatePagination = function() {
      var offset = $scope.pagination.page * $scope.pagination.limit;
      $scope.pagination.visible = (offset >= $scope.pagination.count) ? false : true;
    }


    $scope.loadMore = function() {
      $scope.pagination.disable = true;
      $scope.pagination.page += 1;
      $http.get(env.api + '/shelter/' + $params.shelterUrlId +'/pets', {
        params: {
          page: $scope.pagination.page,
          limit: $scope.pagination.limit
        }
      }).success(function(data, status, headers, config) {
        $scope.pets = $scope.pets.concat(data.shelter_and_pets.pets);
        $scope.pagination.count = data.shelter_and_pets.pet_count;
        calculatePagination();
      }).error(function(data, status, headers, config) {
        alert(data.error)
      });
    };

    $http.get(env.api + '/shelter/' + $params.shelterUrlId +'/pets', {
      params: {
        page: $scope.pagination.page,
        limit: $scope.pagination.limit
      }
    }).success(function(data, status, headers, config) {
      $scope.shelter = data.shelter_and_pets.shelter;
      $scope.pets = data.shelter_and_pets.pets;
      $scope.pagination.count = data.shelter_and_pets.pet_count;
      calculatePagination();
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      alert(data.error)
    });
  }]);
