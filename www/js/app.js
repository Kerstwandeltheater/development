angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
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
                if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
                    
                    var path = (ionic.Platform.isAndroid()) ? '/android_asset/www/' : '';
//                        path += 'pieces/piece_' + $stateParams.item  + '.mp3';
                        path += 'pieces/piece_1.mp3'
                    return $cordovaMedia.newMedia(path);
                }
                return 'nope';
            }
        },
        views: {
            'menuContent': {
                templateUrl: function ($stateParams){
                    currentPage = pages.indexOf($stateParams.item);
                    return 'templates/pieces/piece' + $stateParams.item + '.html';
                },
                controller: 'PieceCtrl'
            }
        },
        onEnter: function(media){
            if(media !== 'nope'){
                media.setVolume(0);
                media.stop();
            }
        },
        onExit: function(media){
            if(media !== 'nope'){
                media.setVolume(0);
                media.stop();
                media.release();
            }
        }
    });
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
