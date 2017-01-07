
angular.module("controlConsole")
    .component("controlConsole", {
        templateUrl: "control-console/control-console.template.html",
        controller: function ControlConsoleController($rootScope) {

            this.buttonPressed = function (id) {
                $rootScope.$broadcast('button.pressed', {value:id});
            }
        }
    });
