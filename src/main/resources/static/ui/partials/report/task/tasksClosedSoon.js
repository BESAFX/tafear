app.controller('tasksClosedSoonCtrl', ['$scope', '$rootScope', '$timeout', '$uibModalInstance', 'PersonService',
    function ($scope, $rootScope, $timeout, $uibModalInstance, PersonService) {

        $scope.buffer = {};

        $scope.submit = function () {
            var search = [];
            search.push('personId=');
            search.push($scope.buffer.person.id);
            search.push('&');
            search.push('taskPersonId=');
            search.push($scope.buffer.taskPerson.id);
            search.push('&');
            window.open('/report/TasksClosedSoon?' + search.join(""));
        };


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            PersonService.findPersonUnderMeSummery().then(function (data) {
                $scope.persons = data;
            })
        }, 1500);

    }]);