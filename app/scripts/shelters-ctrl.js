'use strict';

angular.module('petstablished')
  .controller('SheltersCtrl', ['$scope', '$http', '$state', '$stateParams', 'env', function ($scope, $http, $state, $params, env) {
    $scope.pagination = {
      page: 1,
      limit: 10,
      count: 0,
      visible: false
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

    var calculatePagination = function() {
      var offset = $scope.pagination.page * $scope.pagination.limit;
      $scope.pagination.visible = (offset >= $scope.pagination.count) ? false : true;
    }

    $scope.loadMore = function() {
      $scope.pagination.page += 1;
      $http.get(env.api + '/shelter/index', {
        params: {
          page: $scope.pagination.page,
          limit: $scope.pagination.limit
        }
      }).success(function(data, status, headers, config) {
        $scope.shelters = $scope.shelters.concat(data.index_with_extras.shelters)
        $scope.pagination.count = data.index_with_extras.count
        calculatePagination();
      }).error(function(data, status, headers, config) {
        alert(data.error)
      });
    }
    $http.get(env.api + '/shelter/index', {
      params: {
        page: $scope.pagination.page,
        limit: $scope.pagination.limit
      }
    }).success(function(data, status, headers, config) {
      $scope.shelters = data.index_with_extras.shelters
      $scope.pagination.count = data.index_with_extras.count
      calculatePagination();
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      alert(data.error)
    });
  }]);
