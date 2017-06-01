app.controller("profileCtrl", ['PersonService', 'FileUploader', 'FileService', '$rootScope', '$scope', '$timeout', '$log',
    function (PersonService, FileUploader, FileService, $rootScope, $scope, $timeout, $log) {

        $timeout(function () {
            PersonService.findActivePerson().then(function (data) {
                $scope.me = data;
            });
            if ($scope.me.photo) {
                FileService.getSharedLink($scope.me.photo).then(function (data) {
                    $scope.logoLink = data;
                });
            }
        }, 2000);

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

        $scope.submit = function () {
            PersonService.update($scope.me).then(function (data) {
                $scope.me = data;
            });
        };
        var uploader = $scope.uploader = new FileUploader({
            url: 'uploadFile'
        });
        uploader.filters.push({
            name: 'syncFilter',
            fn: function (item , options) {
                return this.queue.length < 10;
            }
        });
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item , options, deferred) {
                setTimeout(deferred.resolve, 1e3);
            }
        });
        uploader.onAfterAddingFile = function (fileItem) {
            uploader.uploadAll();
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.me.photo = response;
            FileService.getSharedLink(response).then(function (data) {
                $scope.logoLink = data;
            });
        };

    }]);