app.controller("companyCtrl", ['CompanyService', 'PersonService', 'ModalProvider', '$scope', '$rootScope', '$log', '$http', '$state', '$timeout',
    function (CompanyService, PersonService, ModalProvider, $scope, $rootScope, $log, $http, $state, $timeout) {

        $scope.selected = {};

        $scope.options = {};

        $scope.submit = function () {
            CompanyService.update($scope.selected).then(function (data) {
                $scope.selected = data;
            });
        };

        $scope.switchWarnMessageState = function () {
            if ($scope.options.obj1) {
                CompanyService.activateWarnMessage();
            } else {
                CompanyService.deactivateWarnMessage();
            }
        };

        $scope.switchDeductionMessageState = function () {
            if ($scope.options.obj2) {
                CompanyService.activateDeductionMessage();
            } else {
                CompanyService.deactivateDeductionMessage();
            }
        };

        //////////////////////////File Manager///////////////////////////////////
        $scope.uploadFile = function () {
            document.getElementById('uploader').click();
        };

        $scope.uploadCompanyLogo = function (files) {
            CompanyService.uploadCompanyLogo(files[0]).then(function (data) {
                $scope.selected.logo = data;
            });
        };
        //////////////////////////File Manager///////////////////////////////////

        $timeout(function () {
            CompanyService.fetchTableDataSummery().then(function (data) {
                $scope.selected = data[0];
                $scope.options = JSON.parse(data[0].options);
            });
            PersonService.findAllSummery().then(function (data) {
                $scope.persons = data;
            });
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

    }]);