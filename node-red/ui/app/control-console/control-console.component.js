
angular
.module("controlConsole")
.component("controlConsole", {
    templateUrl:"control-console/control-console.template.html",
    controller:function ControlConsoleController($scope, apiService){
        $scope.onStop = function() {
            apiService.stop();
            apiService.setLed('red', 'momentary');
        };

        $scope.onCancel = function() {
            apiService.cancelTurn();
            apiService.setLed('yellow', 'momentary');
        };
    }
});
