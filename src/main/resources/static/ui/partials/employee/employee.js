app.controller("employeeCtrl", ['EmployeeService', 'ModalProvider',  '$scope', '$rootScope', '$log', '$http', '$state', '$timeout',
    function (EmployeeService, ModalProvider,  $scope, $rootScope, $log, $http, $state, $timeout) {

        $scope.selected = {};

        $scope.fetchTableData = function () {
            EmployeeService.fetchTableData().then(function (data) {
                $scope.employees = data;
                $scope.setSelected(data[0]);
            })
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.employees, function (employee) {
                    if (object.id == employee.id) {
                        $scope.selected = employee;
                        return employee.isSelected = true;
                    } else {
                        return employee.isSelected = false;
                    }
                });
            }
        };

        $scope.delete = function (employee) {
            if (employee) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الموظف فعلاً؟", "error", "fa-trash", function () {
                    EmployeeService.remove(employee.id).then(function () {
                        $scope.removeRow(employee.id);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الموظف فعلاً؟", "error", "fa-trash", function () {
                EmployeeService.remove($scope.selected.id).then(function () {
                    $scope.removeRow(employee.id);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">انشاء موظف جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openEmployeeUpdateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات الموظف<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openEmployeeUpdateModel($itemScope.employee);
                }
            },
            {
                html: '<div class="drop-menu">حذف الموظف<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.employee);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);