
angular.module("directionalConsole")
    .component("directionalConsole", {
        templateUrl: "directional-console/directional-console.template.html",
        controller: function DirectionalConsoleController($rootScope, $scope) {
            var self = this;

            $scope.$on('rate.set', function(e, args){
                self.rate = args.value;
            });

            self.onChanged = function () {
                $rootScope.$broadcast('rate.changed', {value:self.rate});
            };
        },
        binding: {
            rate: '='
        }
    }); 
