app.controller("incomingTasksCtrl", ['ModalProvider', '$scope', '$rootScope', '$timeout', 'TaskService', 'TaskOperationService',
    function (ModalProvider, $scope, $rootScope, $timeout, TaskService, TaskOperationService) {

        $scope.selected = {};

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.tasks, function (task) {
                    if (object.id == task.id) {
                        $scope.selected = task;
                        return task.isSelected = true;
                    } else {
                        return task.isSelected = false;
                    }
                });
            }
        };

        $scope.fetchOpened = function () {
            $scope.viewType = 'جميع المهام الواردة السارية';
            // $rootScope.showNotify("الرئيسية", "جاري تحميل جميع المهام الواردة السارية، فضلاً انتظر قليلاً", "warning", "fa-dashboard");
            var search = [];
            search.push('isTaskOpen=');
            search.push(true);
            search.push('&');
            search.push('taskType=');
            search.push(true);
            search.push('&');
            search.push('person=');
            search.push($scope.me.id);
            search.push('&');
            search.push('timeType=');
            search.push('All');
            search.push('&');
            TaskService.filter(search.join("")).then(function (data) {
                $scope.tasks = data;
                $scope.setSelected(data[0]);
                // $rootScope.showNotify("الرئيسية", "تم تحميل جميع المهام الواردة السارية بنجاح", "success", "fa-dashboard");
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 500);
            });
        };

        $scope.fetchClosed = function () {
            $scope.viewType = 'جميع المهام الواردة المغلقة';
            // $rootScope.showNotify("الرئيسية", "جاري تحميل جميع المهام الواردة المغلقة، فضلاً انتظر قليلاً", "warning", "fa-dashboard");
            var search = [];
            search.push('isTaskOpen=');
            search.push(false);
            search.push('&');
            search.push('taskType=');
            search.push(true);
            search.push('&');
            search.push('person=');
            search.push($scope.me.id);
            search.push('&');
            search.push('timeType=');
            search.push('All');
            search.push('&');
            TaskService.filter(search.join("")).then(function (data) {
                $scope.tasks = data;
                $scope.setSelected(data[0]);
                // $rootScope.showNotify("الرئيسية", "تم تحميل جميع المهام الواردة المغلقة بنجاح", "success", "fa-dashboard");
                $timeout(function () {
                    window.componentHandler.upgradeAllRegistered();
                }, 500);
            });
        };

        $scope.findTaskOperations = function () {
            TaskOperationService.findByTask($scope.selected).then(function (data) {
                $scope.selected.taskOperations = data;
            })
        };

        $scope.refresh = function () {
            switch ($scope.viewType) {
                case 'جميع المهام الواردة السارية':
                    $scope.fetchOpened();
                    break;
                case 'جميع المهام الواردة المغلقة':
                    $scope.fetchClosed();
                    break;
            }
        };

        $scope.openTasksOperationsReportModel = function () {
            ModalProvider.openTaskOperationsReportModel($scope.tasks);
        };

        $scope.openReportTasksModel = function () {
            ModalProvider.openTasksReportModel($scope.tasks);
        };

        $timeout(function () {
            $scope.fetchOpened();
        }, 2000);
        
    }]);
