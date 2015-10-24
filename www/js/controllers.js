angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PieceCtrl', function($scope, $stateParams, $cordovaMedia) {
    $scope.piece = $stateParams.item;
    
    ionic.Platform.ready(function() {
        $scope.buttonText = 'Nummer afslepen';
        $scope.playing = false;
        
        var media   = $cordovaMedia.newMedia('/android_asset/www/pieces/piece_1.mp3'),
            playing        = false,
            muted          = false;
            
        $scope.playing = playing;
        $scope.muted   = muted;

        $scope.play = function() {
            if(playing === false) {
                media.play();
                $scope.playing = playing = true;
                $scope.buttonText = 'Nummer stoppen';
            }
            else {
                media.stop();
                $scope.playing = playing = false;
                $scope.buttonText = 'Nummer afslepen';
            }
        };
        
        $scope.mute = function() {
            if(muted === false) {
                media.setVolume(0);
                $scope.muted = muted = true;
            }
            else {
                media.setVolume(1);
                $scope.muted = muted = false;
            }
        };
    });
 
});
