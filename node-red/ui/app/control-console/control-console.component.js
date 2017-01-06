
angular.module("controlConsole")
    .component("controlConsole", {
        templateUrl: "control-console/control-console.template.html",
        controller: function ControlConsoleController(apiService) {
            this.stopClick = function() {
                alert('stop');
                apiService.stop();
                apiService.setLed('red', 'momentary');
            };

            this.cancelClick = function() {
                apiService.cancelTurn();
                apiService.setLed('yellow', 'momentary');
            };
        }
    });
