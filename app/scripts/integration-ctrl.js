'use strict';

angular.module('petstablished')
  .controller('IntegrationCtrl', ['$scope', '$http', '$state', 'env', function ($scope, $http, $state, env) {
    $scope.form = {};
    $scope.status = {
      button: 'Process'
    }
    $scope.processing = false;
    $scope.response = {};
    $scope.resetForm = function() {
      $scope.form = {};
      $scope.processing = false;
    };
    $scope.submit = function() {
      $scope.processing = true;
      $scope.status.button = 'Processing...';
      $http.post(env.api + '/shelter/add_pets_to_organization', {
        integration: {
          organization_id: $scope.form.organizationId,
          fetch_count: $scope.form.fetchCount
        }
      }).success(function(data, status, headers, config) {
        $scope.response = data.shelter
        $state.go('integrate.preview');
        $scope.status.button = 'Process'
      }).error(function(data, status, headers, config) {
        alert(data.error)
        $scope.status.button = 'Process'
        $scope.processing = false;
      });
    }
  }]);
