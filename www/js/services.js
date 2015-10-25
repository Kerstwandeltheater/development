angular.module('starter.services', [])
    .service('groepsleiderService', function() {
        this.loggedIn = false;

        this.logIn = function() {
            this.loggedIn = true;
        };
        this.logOut = function() {
            this.loggedOut = false;
        };
    });