app.controller('departmentCreateUpdateCtrl', ['DepartmentService', 'BranchService', 'PersonService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'department',
    function (DepartmentService, BranchService, PersonService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, department) {

        $timeout(function () {
            BranchService.fetchTableData().then(function (data) {
                $scope.branches = data;
            });
            PersonService.findAllCombo().then(function (data) {
                $scope.persons = data;
            });
        }, 1500);

        if (department) {
            $scope.department = department;
        } else {
            $scope.department = {};
        }

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    DepartmentService.create($scope.department).then(function (data) {
                        $scope.department = {};
                        $scope.form.$setPristine();
                    });
                    break;
                case 'update' :
                    DepartmentService.update($scope.department).then(function (data) {
                        $scope.department = data;
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);