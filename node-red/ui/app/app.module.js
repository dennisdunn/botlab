
angular.module('app', [
    'ngMaterial',
    'core',
    'controlConsole',
    'directionalConsole'
]);

angular.module('app')
.config(function($mdIconProvider) {
  $mdIconProvider
    .defaultIconSet('resources/mdi.svg') // https://materialdesignicons.com/getting-started
});
