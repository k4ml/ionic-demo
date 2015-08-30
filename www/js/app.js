// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider/*, $ionicAppProvider*/){

  // $ionicAppProvider.identify({
  //   app_id: '2a73df28',
  //   api_key: 'aa111f60f66b5d87f7e46eb91a788952a6430585b830cdc5'
  // });

  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
  })

  .state('list', {
    url: "/list",
    templateUrl: "templates/list.html",
    controller: "ListCtrl",
  })

  .state('detail', {
    url: "/detail/:id",
    templateUrl: 'templates/detail.html',
    controller: 'DetailCtrl'
  });
  
  $urlRouterProvider.otherwise('/login');
})