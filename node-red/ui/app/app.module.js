
angular.module('botconApp', [
    'ngMaterial',
    'controlConsole'
])
.config(function($mdIconProvider) {
  $mdIconProvider
    .defaultIconSet('resources/mdi.svg') // https://materialdesignicons.com/getting-started
});
