'use strict';

angular.module('petstablished')
  .controller('SheltersCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $params) {
    $scope.pagination = {
      page: 1
    }
    $scope.setupCrumbs = function() {
      $scope.breadcrumbs = [{
        state: 'integrate.form',
        name: 'Home',
        params: {},
        active: false
      }, {
        state: 'shelters',
        name: 'Shelters',
        params: {},
        active: true
      }]
    }
    $http.get('http://localhost:3000/api/shelter/index', {
      params: {
        page: $scope.pagination.page
      }
    }).success(function(data, status, headers, config) {
      $scope.shelters = data
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      // alert(data.error)
    });
  }]);
