app.controller('regionCreateUpdateCtrl', ['RegionService', 'PersonService', 'CompanyService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'region',
    function (RegionService, PersonService, CompanyService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, region) {

        $timeout(function () {
            PersonService.findAllSummery().then(function (data) {
                $scope.persons = data;
            });
            CompanyService.fetchTableDataSummery().then(function (data) {
                $scope.companies = data;
            });
        }, 1500);

        if (region) {
            $scope.region = region;
        } else {
            $scope.region = {};
        }

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    RegionService.create($scope.region).then(function (data) {
                        $scope.region = {};
                        $scope.form.$setPristine();
                    });
                    break;
                case 'update' :
                    RegionService.update($scope.region).then(function (data) {
                        $scope.region = data;
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);