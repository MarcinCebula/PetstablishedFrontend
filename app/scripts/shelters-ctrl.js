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
        params: {}
      }, {
        state: 'shelters',
        name: 'shelterid',
        params: {}
      }, {
        state: 'pets.view',
        name: 'pet-id',
        params: {petId: 'test'}
      }]
    }
    $http.post('http://localhost:3000/api/shelter/index', {
      shelter: {
        page: $scope.pagination.page,
        url_id: $params.shelterUrlId
      }
    }).success(function(data, status, headers, config) {
      console.log(data);
      $scope.response = data
      $scope.setupCrumbs();
    }).error(function(data, status, headers, config) {
      // alert(data.error)
    });
  }]);
