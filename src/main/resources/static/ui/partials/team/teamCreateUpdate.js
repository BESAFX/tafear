app.controller('teamCreateUpdateCtrl', ['TeamService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'action', 'team',
    function (TeamService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, action, team) {

        $scope.roles = [
            {id: 1, name:'تعديل بيانات الشركة', value: 'ROLE_COMPANY_UPDATE', selected: false},
            {id: 2, name:'إنشاء المناطق', value: 'ROLE_REGION_CREATE', selected: false},
            {id: 3, name:'تعديل بيانات المناطق', value: 'ROLE_REGION_UPDATE', selected: false},
            {id: 4, name:'حذف المناطق', value: 'ROLE_REGION_DELETE', selected: false},
            {id: 5, name:'إنشاء الفروع', value: 'ROLE_BRANCH_CREATE', selected: false},
            {id: 6, name:'تعديل بيانات الفروع', value: 'ROLE_BRANCH_UPDATE', selected: false},
            {id: 7, name:'حذف الفروع', value: 'ROLE_BRANCH_DELETE', selected: false},
            {id: 8, name:'إنشاء الاقسام', value: 'ROLE_DEPARTMENT_CREATE', selected: false},
            {id: 9, name:'تعديل بيانات الاقسام', value: 'ROLE_DEPARTMENT_UPDATE', selected: false},
            {id: 10, name:'حذف الاقسام', value: 'ROLE_DEPARTMENT_DELETE', selected: false},
            {id: 11, name:'إنشاء حسابات الموظفون', value: 'ROLE_EMPLOYEE_CREATE', selected: false},
            {id: 12, name:'تعديل بيانات حسابات الموظفون', value: 'ROLE_EMPLOYEE_UPDATE', selected: false},
            {id: 13, name:'حذف حسابات الموظفون', value: 'ROLE_EMPLOYEE_DELETE', selected: false},
            {id: 14, name:'إنشاء المستخدمون', value: 'ROLE_PERSON_CREATE', selected: false},
            {id: 15, name:'تعديل المستخدمون', value: 'ROLE_PERSON_UPDATE', selected: false},
            {id: 16, name:'حذف المستخدمون', value: 'ROLE_PERSON_DELETE', selected: false},
            {id: 17, name:'إنشاء المهام', value: 'ROLE_TASK_CREATE', selected: false},
            {id: 18, name:'تعديل المهام', value: 'ROLE_TASK_UPDATE', selected: false},
            {id: 19, name:'حذف المهام', value: 'ROLE_TASK_DELETE', selected: false},
            {id: 20, name:'التعليق على المهام', value: 'ROLE_TASK_OPERATION_CREATE', selected: false},
            {id: 21, name:'إنشاء الصلاحيات', value: 'ROLE_TEAM_CREATE', selected: false},
            {id: 22, name:'تعديل بيانات الصلاحيات', value: 'ROLE_TEAM_UPDATE', selected: false},
            {id: 23, name:'حذف الصلاحيات', value: 'ROLE_TEAM_DELETE', selected: false}
        ];


        if (team) {
            $scope.team = team;
            if(typeof team.authorities === 'string'){
                $scope.team.authorities = team.authorities.split(',');
            }
            //
            angular.forEach($scope.team.authorities, function (auth) {
                angular.forEach($scope.roles, function (role) {
                    if(role.value === auth){
                        return role.selected = true;
                    }
                })
            });
        } else {
            $scope.team = {};
        }

        $scope.title = title;

        $scope.action = action;

        $scope.submit = function () {
            $scope.team.authorities = [];
            angular.forEach($scope.roles, function (role) {
                if(role.selected){
                    $scope.team.authorities.push(role.value);
                }
            });
            $scope.team.authorities = $scope.team.authorities.join();
            switch ($scope.action) {
                case 'create' :
                    TeamService.create($scope.team).then(function (data) {
                        $scope.team = {};
                        $scope.from.$setPristine();
                    });
                    break;
                case 'update' :
                    TeamService.update($scope.team).then(function (data) {
                        $scope.team = data;
                        $scope.team.authorities = team.authorities.split(',');
                    });
                    break;
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);