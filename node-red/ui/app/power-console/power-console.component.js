
angular.module("powerConsole")
    .component("powerConsole", {
        templateUrl: "power-console/power-console.template.html",
        controller: function powerConsoleController($rootScope, $scope) {
            var self = this;

            $scope.$on('power.set', function (e, args) {
                self.power = args.value;
            });

            self.onChanged = function () {
                $rootScope.$broadcast('power.changed', { value: self.power });
            };
        },
        binding: {
            power: '='
        }
    }); 
