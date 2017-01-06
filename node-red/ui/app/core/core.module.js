angular.module("core", ['$http']);

angular.module("core")
.factory('apiService',['$http', function($http) {

    var urlBase = '/api/';
    var service = {};

    service.setPower = function(level){
        return $http.get(urlBase + 'power?param='+level);
    };

    service.setTurnrate = function(rate){
        return $http.get(urlBase + 'turnrate?param='+rate);
    };

    service.setLed = function(target, state){
        return $http.get(urlBase + 'led?cmd='+target+'&param='+state);
    };

    service.cancelTurn = function(){
        return $http.get(urlBase + 'turnrate?param=0');
    };

    service.stop = function(){
        return $http.get(urlBase + 'power?param=0');
    };

    return service;
}]);