angular.module('core')
    .factory('apiService', ['$http', 'settingsService', function ($http, settingsService) {

        function getUrl() {
            return settingsService.botUri + settingsService.apiUri;
        };

        return {
            setPower: function (level) {
                return $http.get(getUrl() + '/power?param=' + level);
            },

            setTurnrate: function (rate) {
                return $http.get(getUrl() + '/turnrate?param=' + rate);
            },

            setLed: function (target, state) {
                return $http.get(getUrl() + '/led?cmd=' + target + '&param=' + state);
            },

            cancelTurn: function () {
                return $http.get(getUrl() + '/turnrate?param=0');
            },

            stop: function () {
                return $http.get(getUrl() + '/power?param=0');
            }
        }
    }]);