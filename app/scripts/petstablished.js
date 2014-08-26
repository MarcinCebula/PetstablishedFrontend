'use strict';

angular.module('petstablished', [
  'ngCookies',
  'ui.router',
  'Devise'
])
  .config(['AuthProvider', 'env', '$httpProvider', function(AuthProvider, env, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    // Customize login
    AuthProvider.loginMethod('GET');
    AuthProvider.loginPath('http://localhost:3000/users/sign_up.json');

    // Customize logout
    AuthProvider.logoutMethod('POST');
    AuthProvider.logoutPath(env.domain + '/users/logout.json');

    // Customize register
    AuthProvider.registerMethod('GET');
    AuthProvider.registerPath('http://localhost:3000/users/sign_up.json');

    // Ignore 401 Unauthorized everywhere
    // Disables `devise:unauthorized` interceptor
    AuthProvider.ignoreAuth(true);

    // Customize user parsing
    // NOTE: **MUST** return a truth-y expression
    AuthProvider.parse(function(response) {
      return response.data.user;
    });
  }]);
