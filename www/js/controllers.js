angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {
    
    $scope.add = function(){
        if(window.timesClicked >= 7) {
           return true;
       }
       window.timesClicked++;
       
       if(window.timesClicked == 7) {
           var body = document.getElementById('body');
           body.classList.add('groepsleider');
       }
    }
    
    $scope.start = function() {
        $state.go('app.item', {item: 0});
    };
})

.controller('PieceCtrl', function($scope, $stateParams, $state, $ionicHistory, $timeout, $ionicPlatform, $cordovaMedia) {
    
    $scope.piece = $stateParams.item;
    $scope.currentPage = currentPage;
    
    ionic.Platform.ready(function() {
        
        var media          = 'nope',
            playing        =  false,
            muted          = false,
            delayedPlaying = false;
        
        $scope.playing = playing = false;
        $scope.muted   = muted = false;
        
        $scope.buttonText = 'Nummer afspelen';
        
        $scope.$on('$ionicView.beforeEnter', function() {
            if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {

                if(typeof songs[$stateParams.item] !== 'undefined'
                    && songs[$stateParams.item].length > 0) {

                    var path = (ionic.Platform.isAndroid()) ? '/android_asset/www/' : '';
                        path += 'pieces/' + songs[$stateParams.item];

                    media = $cordovaMedia.newMedia(path);
                }
            }

            if(media !== 'nope') {
                media.setVolume(0);
            }
            
            $scope.playing = playing = false;
            $scope.muted   = muted = false;
            $scope.buttonText = 'Nummer afspelen';
        });
        
        $ionicPlatform.on('pause', function() {
            if(media !== 'nope') {
                media.stop();
            }
            $scope.playing = playing = false;
            $scope.buttonText = 'Nummer afspelen';
        });
        
        $scope.$on('$ionicView.beforeLeave', function() {
            if(media !== 'nope') {
                media.stop();
                media.release();
            }
            $scope.playing = playing = false;
            $scope.buttonText = 'Nummer afspelen';
        });
        
        $scope.delayedPlay = function() {
            
            if(delayedPlaying === true) {
                return;
            }
            delayedPlaying = true;
            
            if(media !== 'nope') {
                
                media.setVolume(1);
                $timeout(function(){
                    media.play();
                }, (1000) * ((2 * 60) + Math.random() * 30));
            }
            
            $scope.playing = playing = true;
            $scope.buttonText = 'Moment geduld a.u.b.';
        };
        
        $scope.play = function(force) {
            
            if(playing === true || (typeof force !== 'undefined' && force === true)) {
                if(media !== 'nope') {
                    media.stop();
                    
                    if(typeof force !== 'undefined' && force === true) {
                        media.release();
                    }
                }
                
                $scope.playing = playing = false;
                $scope.buttonText = 'Nummer afspelen';
                
                return true;
            }
            
            if(media !== 'nope') {
                media.setVolume(1);
                media.play();
            }
            $scope.playing = playing = true;
            $scope.buttonText = 'Nummer stoppen';
        };
        
        $scope.mute = function() {
            
            if(muted === false) {
                
                if(media !== 'nope') {
                    media.setVolume(0);
                }
                $scope.muted = muted = true;
                
                return true;
            }
            
            if(media !== 'nope') {
                media.setVolume(1);
            }
            $scope.muted = muted = false;
        };
        
        $scope.previous = function() {
            var previous = currentPage - 1;
            
            $scope.play(true);
            
            if( previous < 0) {
                $ionicHistory.clearHistory();
                
                $state.go('app.home');
                return;
            }
            
            currentPage = previous;
            
            $state.go('app.item', {item: pages[previous]});
        };
        
        $scope.next = function() {
            var next = currentPage + 1;
            
            $scope.play(true);
            
            if( next >= pages.length) {
                $ionicHistory.clearHistory();
                
                $state.go('app.home');
                return;
            }
            
            currentPage = next;
            
            $state.go('app.item', {item: pages[next]});
        };
    });
 
});
