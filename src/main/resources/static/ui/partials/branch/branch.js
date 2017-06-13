app.controller("branchCtrl", ['BranchService', 'PersonService', 'ModalProvider',  '$scope', '$rootScope', '$state', '$timeout',
    function (BranchService, PersonService, ModalProvider,  $scope, $rootScope, $state, $timeout) {

        $scope.selected = {};

        $scope.fetchTableData = function () {
            BranchService.fetchTableData().then(function (data) {
                $scope.branches = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.branches, function (branch) {
                    if (object.id == branch.id) {
                        $scope.selected = branch;
                        return branch.isSelected = true;
                    } else {
                        return branch.isSelected = false;
                    }
                });
            }
        };

        $scope.removeRow = function (id) {
            var index = -1;
            var branchesArr = eval($scope.branches);
            for (var i = 0; i < branchesArr.length; i++) {
                if (branchesArr[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.branches.splice(index, 1);
        };

        $scope.delete = function (branch) {
            if (branch) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الفرع فعلاً؟", "error", "fa-trash", function () {
                    BranchService.remove(branch.id).then(function () {
                        $scope.removeRow(branch.id);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف الفرع فعلاً؟", "error", "fa-trash", function () {
                BranchService.remove($scope.selected.id).then(function () {
                    $scope.removeRow(branch.id);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">انشاء فرع جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBranchCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات الفرع<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openBranchUpdateModel($itemScope.branch);
                }
            },
            {
                html: '<div class="drop-menu">حذف الفرع<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.branch);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);