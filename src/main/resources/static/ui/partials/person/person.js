app.controller("personCtrl", ['PersonService', 'ModalProvider', '$scope', '$rootScope', '$state', '$timeout',
    function (PersonService, ModalProvider, $scope, $rootScope, $state, $timeout) {

        $scope.selected = {};
        $scope.persons = [];

        $scope.fetchTableData = function () {
            PersonService.findAll().then(function (data) {
                $scope.persons = data;
                $scope.setSelected(data[0]);
            });
        };

        $scope.setSelected = function (object) {
            if (object) {
                angular.forEach($scope.persons, function (person) {
                    if (object.id == person.id) {
                        $scope.selected = person;
                        return person.isSelected = true;
                    } else {
                        return person.isSelected = false;
                    }
                });
            }
        };

        $scope.newPerson = function () {
            ModalProvider.openPersonCreateModel().result.then(function (branch) {
                $scope.persons.splice(0,0,branch);
            }, function () {
                $log.info('PersonCreateModel Closed.');
            });
        };

        $scope.delete = function (person) {
            if (person) {
                $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستخدم فعلاً؟", "error", "fa-trash", function () {
                    PersonService.remove(person.id).then(function () {
                        var index = $scope.persons.indexOf(person);
                        $scope.persons.splice(index, 1);
                        $scope.setSelected($scope.persons[0]);
                    });
                });
                return;
            }

            $rootScope.showConfirmNotify("حذف البيانات", "هل تود حذف المستخدم فعلاً؟", "error", "fa-trash", function () {
                PersonService.remove($scope.selected.id).then(function () {
                    var index = $scope.persons.indexOf(selected);
                    $scope.persons.splice(index, 1);
                    $scope.setSelected($scope.persons[0]);
                });
            });
        };

        $scope.rowMenu = [
            {
                html: '<div class="drop-menu">انشاء مستخدم جديد<span class="fa fa-pencil fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPersonCreateModel();
                }
            },
            {
                html: '<div class="drop-menu">تعديل بيانات المستخدم<span class="fa fa-edit fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPersonUpdateModel($itemScope.person);
                }
            },
            {
                html: '<div class="drop-menu">حذف المستخدم<span class="fa fa-trash fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    $scope.delete($itemScope.person);
                }
            },
            {
                html: '<div class="drop-menu">طباعة تقرير مختصر<span class="fa fa-print fa-lg"></span></div>',
                enabled: function () {
                    return true
                },
                click: function ($itemScope, $event, value) {
                    ModalProvider.openPersonsReportModel($scope.persons);
                }
            }
        ];

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
            $scope.fetchTableData();
        }, 1500);

    }]);