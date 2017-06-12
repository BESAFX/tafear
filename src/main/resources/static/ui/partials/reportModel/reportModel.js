app.controller("reportModelCtrl", ['ReportModelService', 'ModalProvider', '$scope', '$rootScope', '$state', '$timeout',
    function (ReportModelService, ModalProvider, $scope, $rootScope, $state, $timeout) {

        $scope.selected = {};

        $scope.fetchTableData = function () {
            ReportModelService.findAll().then(function (data) {
                $scope.reportModels = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.reportModels, function (reportModel) {
                    if (object.id == reportModel.id) {
                        $scope.selected = reportModel;
                        return reportModel.isSelected = true;
                    } else {
                        return reportModel.isSelected = false;
                    }
                });
            }
        };

        $scope.removeRow = function (id) {
            var index = -1;
            var reportModelsArr = eval($scope.reportModels);
            for (var i = 0; i < reportModelsArr.length; i++) {
                if (reportModelsArr[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.reportModels.splice(index, 1);
        };

        $scope.delete = function (reportModel) {
            if (reportModel) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف النموذج فعلاً؟", "error", "fa-trash", function () {
                    ReportModelService.remove(reportModel.id).then(function () {
                        $scope.removeRow(reportModel.id);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف النموذج فعلاً؟", "error", "fa-trash", function () {
                ReportModelService.remove($scope.selected.id).then(function () {
                    $scope.removeRow(reportModel.id);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">إنشاء نموذج جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openReportModelCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات النموذج<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openReportModelCreateModel($itemScope.reportModel);
                }
            },
            {
                html: '<div class="drop-menu">حذف النموذج<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.reportModel);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);