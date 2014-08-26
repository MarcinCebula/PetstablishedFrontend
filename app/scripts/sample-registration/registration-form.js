'use strict';

angular.module('petstablished')
  .controller('RegistrationFormCtrl', ['$scope', 'Auth', '$http', 'env', function($scope, Auth, $http, env) {
    console.log('initalize RegistrationFormCtrl');

    $scope.credentials = {
      email: 'marcin.k.cebula@gmail.com',
      password: 'pass12345',
      passwordConfirmation: 'pass12345'
    };

    $scope.registerUser = function() {
      console.log('register user');
      // Auth.register($scope.credentials);


      Auth.currentUser().then(function(user) {
        console.log("authenticated user")
        // User was logged in, or Devise returned
        // previously authenticated session.
        console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
        console.log("error")
        console.log(error);
        // unauthenticated error
      });

    };

    $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
      console.log('unauthorized request');
      Auth.login($scope.credentials).then(function() {
        // Successfully logged in.
        // Redo the original request.
        // console.log('success', xhr.config);
        return $http(xhr.config);
      }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.
        console.log(response);
        // deferred.resolve(response);
      }, function(error) {
        // There was an error.
        // Reject the original request's promise.
        deferred.reject(error);

      });
      $scope.$on('devise:login', function(event, currentUser) {
        console.log('devise:login');
        // after a login, a hard refresh, a new tab
      });

      $scope.$on('devise:new-session', function(event, currentUser) {
        console.log('new session');
        // user logged in by Auth.login({...})
      });
    });
  }]);
