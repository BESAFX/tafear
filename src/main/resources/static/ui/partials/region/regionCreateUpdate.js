app.controller('regionCreateUpdateCtrl', ['RegionService', 'PersonService', 'CompanyService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'region',
    function (RegionService, PersonService, CompanyService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, region) {

        $timeout(function () {
            PersonService.findAllCombo().then(function (data) {
                $scope.persons = data;
            });
            CompanyService.get().then(function (data) {
                $scope.company = data;
            });
        }, 1500);

        $scope.region = region;

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            $scope.region.company = $scope.company;
            switch ($scope.action) {
                case 'create' :
                    RegionService.create($scope.region).then(function (data) {
                        $uibModalInstance.close(data);
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