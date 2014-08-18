'use strict';

angular.module('petstablished')
  .controller('IntegrationCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.form = {};
    $scope.processing = false;
    $scope.response = {};
    $scope.resetForm = function() {
      $scope.form = {};
      $scope.processing = false;
    };
    $scope.submit = function() {
      $scope.processing = true;
      $http.post('http://localhost:3000/api/shelter/add_pets_to_organization', {
        integration: {
          organization_id: $scope.form.organizationId,
          fetch_count: $scope.form.fetchCount
        }
      }).success(function(data, status, headers, config) {
        $scope.response = data.shelter
        $state.go('integrate.preview');
      }).error(function(data, status, headers, config) {
        alert(data.error)
        $scope.processing = false;
      });
    }
  }]);
