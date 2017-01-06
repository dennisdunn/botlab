
angular.module("controlConsole")
    .component("controlConsole", {
        templateUrl: "control-console/control-console.template.html",
        controller: function ControlConsoleController(apiService) {
            
            this.onBlue = function() {
                apiService.setLed('blue', 'momentary');
            };

            this.onGreen = function() {
                apiService.setLed('green', 'momentary');
            };

            this.onYellow = function() {
                apiService.cancelTurn();
                apiService.setLed('yellow', 'momentary');
            };

            this.onRed = function() {
                apiService.stop();
                apiService.setLed('red', 'momentary');
            };
        }
    });
