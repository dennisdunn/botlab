angular.module('core')
    .controller('SettingsController', function ($scope, $mdDialog, settings) {
        $scope.settings = settings;
        $scope.close = function () {
            $mdDialog.hide();
        };
    });