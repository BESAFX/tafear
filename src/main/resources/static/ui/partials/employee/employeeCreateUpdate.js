app.controller('employeeCreateUpdateCtrl', ['EmployeeService', 'DepartmentService', 'PersonService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'employee',
    function (EmployeeService, DepartmentService, PersonService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, employee) {

        $timeout(function () {
            DepartmentService.fetchTableDataSummery().then(function (data) {
                $scope.departments = data;
            });
            PersonService.findAllSummery().then(function (data) {
                $scope.persons = data;
            });
        }, 1500);

        if (employee) {
            $scope.employee = employee;
        } else {
            $scope.employee = {};
        }

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            switch ($scope.action) {
                case 'create' :
                    EmployeeService.create($scope.employee).then(function (data) {
                        $scope.employee = {};
                        $scope.form.$setPristine();
                    });
                    break;
                case 'update' :
                    EmployeeService.update($scope.employee).then(function (data) {
                        $scope.employee = data;
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);