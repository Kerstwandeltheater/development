// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html'
            }
        }
    })
    
    
    .state('app.item', {
        url: '/piece/:item',
        resolve: {
            media: function($stateParams, $cordovaMedia) {
                if(ionic.platform.isIOS() || ionic.platform.isAndroid()) {
                    return $cordovaMedia.newMedia('/android_asset/www/pieces/piece_1.mp3');
                }
                return false;
            }
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/piece.html',
                controller: 'PieceCtrl'
            }
        },
        onEnter: function(media){
            if(media){
                media.setVolume(0);
                media.stop();
            }
        },
        onExit: function(media){
            if(media){
                media.setVolume(0);
                media.stop();
                media.release();
            }
        }
    });
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
