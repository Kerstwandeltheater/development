angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    
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
})

.controller('PieceCtrl', function($scope, $stateParams, media, $state, $ionicHistory, $timeout) {
    $scope.piece = $stateParams.item;
    $scope.currentPage = currentPage;
    
    ionic.Platform.ready(function() {
        $scope.buttonText = 'Nummer afspelen';
        $scope.playing = false;
        
        var playing,
            muted,
            delayedplay;
            
        $scope.playing = playing = false;
        $scope.muted   = muted = false;

        $scope.delayedPlay = function() {
            if(delayedPlay === true) {
                return;
            }
            delayedplay = true;
            
            if(media !== 'nope') {
                
                media.setVolume(1);
                $timeout(function(){
                    media.play();
                }, (1000) * ((2 * 60) + Math.random() * 30));
            }
            
            $scope.playing = playing = true;
            $scope.buttonText = 'Moment geduld a.u.b.';
        };
        
        $scope.play = function() {
            
            if(playing === false) {
                if(media !== 'nope') {
                    media.setVolume(1);
                    media.play();
                }
                $scope.playing = playing = true;
                $scope.buttonText = 'Nummer stoppen';
            }
            else {
                if(media !== 'nope') {
                    media.stop();
                }
                $scope.playing = playing = false;
                $scope.buttonText = 'Nummer afspelen';
            }
        };
        
        $scope.mute = function() {
            
            if(muted === false) {
                
                if(media !== 'nope') {
                    media.setVolume(0);
                }
                $scope.muted = muted = true;
            }
            else {
                if(media !== 'nope') {
                    media.setVolume(1);
                }
                $scope.muted = muted = false;
            }
        };
        
        $scope.previous = function() {
            var previous = currentPage - 1;
            
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
