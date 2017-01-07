angular.module('core')
    .controller('eventController', function ($rootScope, $scope, apiService) {

        $scope.$on('button.pressed', function (e, args) {
            switch (args.value) {
                case 'blue':
                    break;
                case 'green':
                    break;
                case 'yellow':
                    $rootScope.$broadcast('rate.set', { value: 0 });
                    $rootScope.$broadcast('rate.changed', { value: 0 });
                    break;
                case 'red':
                    $rootScope.$broadcast('power.set', { value: 0 });
                    $rootScope.$broadcast('power.changed', { value: 0 });
                    break;
            }
        });

        $scope.$on('rate.changed', function (e, args) {
            apiService.setTurnrate(args.value);
            apiService.setLed('yellow', 'blink');
        });

        $scope.$on('power.changed', function (e, args) {
            apiService.setPower(args.value);
            apiService.setLed('red', 'blink');
        });
    });