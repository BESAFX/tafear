app.service('ModalProvider', ['$uibModal', '$log', '$rootScope', function ($uibModal, $log, $rootScope) {

    /**************************************************************
     *                                                            *
     * Region Model                                               *
     *                                                            *
     *************************************************************/
    this.openRegionCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/region/regionCreateUpdate.html',
            controller: 'regionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء منطقة جديدة' : 'New Region';
                },
                action: function () {
                    return 'create';
                },
                region: function () {
                    return undefined;
                }
            }
        });
    };

    this.openRegionUpdateModel = function (region) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/region/regionCreateUpdate.html',
            controller: 'regionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات منطقة' : 'Update Region';
                },
                action: function () {
                    return 'update';
                },
                region: function () {
                    return region;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Branch Model                                               *
     *                                                            *
     *************************************************************/
    this.openBranchCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/branch/branchCreateUpdate.html',
            controller: 'branchCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء فرع جديد' : 'New Branch';
                },
                action: function () {
                    return 'create';
                },
                branch: function () {
                    return undefined;
                }
            }
        });
    };

    this.openBranchUpdateModel = function (branch) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/branch/branchCreateUpdate.html',
            controller: 'branchCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات فرع' : 'Update Branch';
                },
                action: function () {
                    return 'update';
                },
                branch: function () {
                    return branch;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Department Model                                           *
     *                                                            *
     *************************************************************/
    this.openDepartmentCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/department/departmentCreateUpdate.html',
            controller: 'departmentCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء قسم جديد' : 'New Department';
                },
                action: function () {
                    return 'create';
                },
                department: function () {
                    return undefined;
                }
            }
        });
    };

    this.openDepartmentUpdateModel = function (department) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/department/departmentCreateUpdate.html',
            controller: 'departmentCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات قسم' : 'Update Department';
                },
                action: function () {
                    return 'update';
                },
                department: function () {
                    return department;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Employee Model                                             *
     *                                                            *
     *************************************************************/
    this.openEmployeeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/employeeCreateUpdate.html',
            controller: 'employeeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء موظف جديد' : 'New Employee';
                },
                action: function () {
                    return 'create';
                },
                employee: function () {
                    return undefined;
                }
            }
        });
    };

    this.openEmployeeUpdateModel = function (employee) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/employeeCreateUpdate.html',
            controller: 'employeeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات موظف' : 'Update Employee';
                },
                action: function () {
                    return 'update';
                },
                employee: function () {
                    return employee;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Person Model                                               *
     *                                                            *
     *************************************************************/
    this.openPersonCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مستخدم جديد' : 'New User';
                },
                action: function () {
                    return 'create';
                },
                person: function () {
                    return undefined;
                }
            }
        });
    };

    this.openPersonUpdateModel = function (person) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/person/personCreateUpdate.html',
            controller: 'personCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات مستخدم' : 'Update User';
                },
                action: function () {
                    return 'update';
                },
                person: function () {
                    return person;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Team Model                                                 *
     *                                                            *
     *************************************************************/
    this.openTeamCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مجموعة جديدة' : 'New Team';
                },
                action: function () {
                    return 'create';
                },
                team: function () {
                    return undefined;
                }
            }
        });
    };

    this.openTeamUpdateModel = function (team) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات مجموعة' : 'Update Team';
                },
                action: function () {
                    return 'update';
                },
                team: function () {
                    return team;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Task Model                                                 *
     *                                                            *
     *************************************************************/
    this.openTaskCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskCreateUpdate.html',
            controller: 'taskCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مهمة جديد' : 'New Task';
                },
                action: function () {
                    return 'create';
                },
                task: function () {
                    return undefined;
                }
            }
        });
    };

    this.openTaskUpdateModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskCreateUpdate.html',
            controller: 'taskCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang==='AR' ? 'تعديل بيانات مهمة' : 'Update Task';
                },
                action: function () {
                    return 'update';
                },
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskDetailsModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskDetails.html',
            controller: 'taskDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskWarnsModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskWarns.html',
            controller: 'taskWarnsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskDeductionsModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskDeductions.html',
            controller: 'taskDeductionsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskOperationsReportModel = function (tasks) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/taskOperationsIn.html',
            controller: 'taskOperationsInCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                tasks: function () {
                    return tasks;
                }
            }
        });
    };

    this.openTaskTosReportModel = function (tasks) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/taskTosIn.html',
            controller: 'taskTosInCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                tasks: function () {
                    return tasks;
                }
            }
        });
    };

    this.openTasksReportModel = function (tasks) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/tasksIn.html',
            controller: 'tasksInCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                tasks: function () {
                    return tasks;
                }
            }
        });
    };

    this.openPersonsReportModel = function (persons) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/person/personsIn.html',
            controller: 'personsInCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                persons: function () {
                    return persons;
                }
            }
        });
    };

    this.openIncomingTasksDeductionsModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/incomingTasksDeductions.html',
            controller: 'incomingTasksDeductionsCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openOutgoingTasksDeductionsModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/outgoingTasksDeductions.html',
            controller: 'outgoingTasksDeductionsCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openTasksClosedSoonModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/tasksClosedSoon.html',
            controller: 'tasksClosedSoonCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openOutgoingTasksOperationsTodayModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/outgoingTasksOperationsToday.html',
            controller: 'outgoingTasksOperationsTodayCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openWatchTasksOperationsModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/task/watchTasksOperations.html',
            controller: 'watchTasksOperationsCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Task Operation Model                                       *
     *                                                            *
     *************************************************************/
    this.openTaskOperationModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskOperation.html',
            controller: 'taskOperationCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskOperationCreateModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskOperationCreate.html',
            controller: 'taskOperationCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskRequestCloseModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskRequestClose.html',
            controller: 'taskRequestCloseCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                },
                type: function () {
                    return true;
                },
                title: function () {
                    return $rootScope.lang==='AR' ? 'طلب إغلاق' : 'Closing Request'
                }
            }
        });
    };

    this.openTaskRequestExtendModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskRequestClose.html',
            controller: 'taskRequestCloseCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                },
                type: function () {
                    return false;
                },
                title: function () {
                    return $rootScope.lang==='AR' ? 'طلب تمديد' : 'Extending Request'
                }
            }
        });
    };

    this.openTaskProgressModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskProgress.html',
            controller: 'taskProgressCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskClosedModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskClosed.html',
            controller: 'taskClosedCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskExtensionModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskExtension.html',
            controller: 'taskExtensionCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskWarnCreateModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskWarnCreate.html',
            controller: 'taskWarnCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskDeductionCreateModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskDeductionCreate.html',
            controller: 'taskDeductionCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskToCreateModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskToCreate.html',
            controller: 'taskToCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskToRemoveModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskToRemove.html',
            controller: 'taskToRemoveCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openTaskToOpenModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/taskToOpen.html',
            controller: 'taskToOpenCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

    this.openClearCountersModel = function (task) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/task/clearCounters.html',
            controller: 'clearCountersCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                task: function () {
                    return task;
                }
            }
        });
    };

}]);

app.service('NotificationProvider', ['$http', function ($http) {

    this.notifyOne = function (code, title, message, type, receiver) {
        $http.post("/notifyOne?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
            + '&'
            + 'receiver=' + receiver);
    };
    this.notifyAll = function (code, title, message, type) {
        $http.post("/notifyAll?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };
    this.notifyAllExceptMe = function (code, title, message, type) {
        $http.post("/notifyAllExceptMe?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };

}]);

