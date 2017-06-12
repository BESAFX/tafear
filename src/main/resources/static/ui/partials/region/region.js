app.controller("regionCtrl", ['RegionService', 'PersonService', 'ModalProvider', 'FileService', '$scope', '$rootScope', '$state', '$timeout',
    function (RegionService, PersonService, ModalProvider, FileService, $scope, $rootScope, $state, $timeout) {

        $scope.selected = {};

        $scope.fetchTableData = function () {
            RegionService.fetchTableData().then(function (data) {
                $scope.regions = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.regions, function (region) {
                    if (object.id == region.id) {
                        $scope.selected = region;
                        return region.isSelected = true;
                    } else {
                        return region.isSelected = false;
                    }
                });
            }
        };

        $scope.removeRow = function (id) {
            var index = -1;
            var regionsArr = eval($scope.regions);
            for (var i = 0; i < regionsArr.length; i++) {
                if (regionsArr[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.regions.splice(index, 1);
        };

        $scope.delete = function (region) {
            if (region) {
                $rootScope.showConfirmNotify("المهام", "هل تود حذف المنطقة فعلاً؟", "error", "fa-trash", function () {
                    RegionService.remove(region.id).then(function () {
                        $scope.removeRow(region.id);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("المهام", "هل تود حذف المنطقة فعلاً؟", "error", "fa-trash", function () {
                RegionService.remove($scope.selected.id).then(function () {
                    $scope.removeRow(region.id);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">انشاء منطقة جديدة<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return $rootScope.contains($rootScope.authorities, ['ROLE_REGION_CREATE']);
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openRegionCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات المنطقة<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openRegionUpdateModel($itemScope.region);
                }
            },
            {
                html: '<div class="drop-menu">حذف المنطقة<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.region);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);