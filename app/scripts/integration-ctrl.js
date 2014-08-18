'use strict';

angular.module('petstablished')
  .controller('IntegrationCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.form = {};
    $scope.processing = false;
    $scope.submit = function() {
      $scope.processing = true;
      $http.post('http://localhost:3000/api/shelter/add_pets_to_organization', {
        integration: {
          organization_id: $scope.form.organizationId,
          fetch_count: $scope.form.fetchCount
        }
      }).success(function(data, status, headers, config) {
        console.log(data);
        alert('success');
      }).error(function(data, status, headers, config) {
        console.log(data);
        alert('error');
      });
    }
  }]);
