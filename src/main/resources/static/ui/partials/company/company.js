app.controller("companyCtrl", ['CompanyService', 'PersonService', 'ModalProvider', '$scope', '$rootScope', '$log', '$http', '$state', '$timeout',
    function (CompanyService, PersonService, ModalProvider, $scope, $rootScope, $log, $http, $state, $timeout) {

        $scope.selected = {};

        $scope.buffer = {};

        $scope.buffer.personsList = [];

        $scope.options = {};

        $scope.submit1 = function () {
            CompanyService.update($scope.selected).then(function (data) {
                $scope.selected = data;
            });
        };
        $scope.submit2 = function () {
            var listId = [];
            for (var i = 0; i < $scope.buffer.personsList.length; i++) {
                listId[i] = $scope.buffer.personsList[i].id;
            }
            $scope.options.emailDeductionPersonsList = listId;
            CompanyService.setEmailDeductionOptions($scope.options);
        };

        $scope.switchWarnMessageState = function () {
            if ($scope.options.activateWarnMessage) {
                CompanyService.activateWarnMessage();
            } else {
                CompanyService.deactivateWarnMessage();
            }
        };

        $scope.switchDeductionMessageState = function () {
            if ($scope.options.activateDeductionMessage) {
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
            CompanyService.get().then(function (data) {
                $scope.selected = data;
                $scope.options = JSON.parse(data.options);
                PersonService.findAllCombo().then(function (data) {
                    $scope.persons = data;
                    angular.forEach($scope.options.emailDeductionPersonsList, function (o) {
                        angular.forEach($scope.persons, function (p) {
                            if(o === p.id){
                                $scope.buffer.personsList.push(p);
                            }
                        })
                    });
                });
            });
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

    }]);