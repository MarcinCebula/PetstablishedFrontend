'use strict';

angular.module('petstablished')
  .controller('PetCtrl', ['$scope', '$http', '$state', '$stateParams', 'env', function ($scope, $http, $state, $params, env) {
    $scope.shelter = {}
    $scope.pet = {}
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
        state: 'pets.index-wrapper.index',
        name: $scope.shelter.name,
        params: { shelterUrlId: $scope.shelter.uid_id },
        active: false
      }, {
        state: 'fake',
        name: $scope.pet.name,
        params: {},
        active: true
      }]
    }
    $scope.petInfo = function() {
      var info = $.extend({}, $scope.pet);
      delete info['media']


      return info;
    }
    var calculatePagination = function() {
      var offset = $scope.pagination.page * $scope.pagination.limit;
      $scope.pagination.visible = (offset >= $scope.pagination.count) ? false : true;
    }

    $scope.isMix = function(mix) {
      return mix == 'yes' ? "Mix" : "";
    };
    $http.get(env.api + '/shelter/' + $params.shelterUrlId +'/pets/' + $params.petId , {
    }).success(function(data, status, headers, config) {
      $scope.shelter = data.shelter_and_pet.shelter;
      $scope.pet = data.shelter_and_pet.pet;
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      alert(data.error)
    });
  }]);
