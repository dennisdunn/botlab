
angular.module("directionalConsole")
    .component("directionalConsole", {
        templateUrl: "directional-console/directional-console.template.html",
        controller: function DirectionalConsoleController(apiService) {
            this.rate = 0;
            this.onChanged = function(rate) {
                apiService.setTurnrate(rate);
                apiService.setLed('yellow', 'momentary');
            };
        }
    });
