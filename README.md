# Ionic Backend Auth Demo

This demo showing a list/detail page that can only be accessed after entering username and password. The username and password then will be validated against a backend API (in PHP).

<a href="http://imgur.com/BHwQ5gP"><img src="http://i.imgur.com/BHwQ5gPm.png" title="source: imgur.com" /></a>
<a href="http://imgur.com/L78RiYJ"><img src="http://i.imgur.com/L78RiYJm.png" title="source: imgur.com" /></a>
<a href="http://imgur.com/9cand64"><img src="http://i.imgur.com/9cand64m.png" title="source: imgur.com" /></a>

# Idea
In each controllers, we can check whether the user has logged in or not, using the `logged_in` state on the `$rootScope`.

```js
.controller('DetailCtrl', function($scope, $state, $stateParams, ChatsService) {
    if (!$scope.logged_in) {
        $state.go('login');
    }

  var chatId = $stateParams.id;
  $scope.chat = ChatsService.get(chatId);
  console.log($scope.logged_in);
})
```
If user has not logged in, we redirect to login controller. In login controller, we submit the username and password user enter to the backend service.

```js
.controller('LoginCtrl', function($scope, $stateParams, myapi) {
  // $scope.chat = ChatsService.get($stateParams.chatId);
  $scope.doLogin = function() {
    myapi.login(this.username, this.password);
  }
```
So the meat of this demo is in the `myapi.login()` function.

```js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.factory('myapi', function($http, $rootScope, $state) {
    var self = this;
    var endpoint = 'http://localhost:4000/';

    function do_get(entity, params, success_cb, headers) {
            var default_headers = {
                Authorization: 'Basic ' + self.credentials,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            if (headers != undefined) {
                _.extend(default_headers, headers);
            }
            console.log('headers: ' + default_headers);

            $http({
                method: 'GET',
                url: endpoint + entity,
                params: params,
                headers: default_headers
            }).success(function(data, status, headers, config) {
                if (success_cb != undefined) {
                    success_cb(data);
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
                alert('Invalid username/password test ' + data);
            });
        }
        return {
            get: do_get,
            login: function(username, password) {
                self.credentials = base64_encode(username + ':' + password);
                do_get('User', {}, function(data) {
                    $rootScope.logged_in = true;
                    $rootScope.account = data;
                    $state.go('list');
                });
            },
            logout: function() {
                self.credentials = undefined;
                $rootScope.logged_in = false;
            }
        };
})
```
