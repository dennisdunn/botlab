
angular.module('app', [
    'ngMaterial',
    'core',
    'controlConsole',
    'directionalConsole',
    'powerConsole'
]).config(function ($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('resources/mdi.svg') // https://materialdesignicons.com/getting-started
});
