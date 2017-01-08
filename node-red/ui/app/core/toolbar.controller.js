angular.module('core')
    .controller('ToolbarController', function ($mdDialog, settingsService) {
        var originatorEv;

        this.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        this.openSettings = function ($event) {

            $mdDialog.show(
                {
                    targetEvent: $event,
                    templateUrl: 'core/settings.template.html',
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    controller: 'SettingsController',
                    locals: { settings: settingsService }
                });

            originatorEv = null;
        };

        this.openAbout = function () {

            $mdDialog.show(
                $mdDialog.alert()
                    .targetEvent(originatorEv)
                    .clickOutsideToClose(true)
                    .parent('body')
                    .title('About')
                    .textContent('BotCon is a simple robot console. It uses an API defined by a Node-Red flow to control a Pi3-based roverbot.')
                    .ok('OK'));

            originatorEv = null;
        };

        this.launchEditor = function () {
            var url = settingsService.botUri + settingsService.editUri;
            originatorEv = null;
        }
    });