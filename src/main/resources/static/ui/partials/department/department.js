app.controller("departmentCtrl", ['DepartmentService', 'ModalProvider', '$scope', '$rootScope', '$log', '$http', '$state', '$timeout',
    function (DepartmentService, ModalProvider, $scope, $rootScope, $log, $http, $state, $timeout) {

        $scope.selected = {};

        $scope.fetchTableData = function () {
            DepartmentService.fetchTableData().then(function (data) {
                $scope.departments = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.departments, function (department) {
                    if (object.id == department.id) {
                        $scope.selected = department;
                        return department.isSelected = true;
                    } else {
                        return department.isSelected = false;
                    }
                });
            }
        };

        $scope.removeRow = function (id) {
            var index = -1;
            var departmentsArr = eval($scope.departments);
            for (var i = 0; i < departmentsArr.length; i++) {
                if (departmentsArr[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.departments.splice(index, 1);
        };

        $scope.delete = function (department) {
            if (department) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف القسم فعلاً؟", "error", "fa-trash", function () {
                    DepartmentService.remove(department.id).then(function () {
                        $scope.removeRow(department.id);
                    });
                });
                return;
            }
            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف القسم فعلاً؟", "error", "fa-trash", function () {
                DepartmentService.remove($scope.selected.id).then(function () {
                    $scope.removeRow(department.id);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">انشاء قسم جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openDepartmentCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات القسم<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openDepartmentUpdateModel($itemScope.department);
                }
            },
            {
                html: '<div class="drop-menu">حذف القسم<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.department);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);