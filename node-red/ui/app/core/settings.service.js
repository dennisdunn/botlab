angular.module('core')
    .factory('settingsService', function () {
        return {
            botUri: 'http://roverbot:1880',
            apiUri: '/api',
            editUri: '/admin'
        }
    });