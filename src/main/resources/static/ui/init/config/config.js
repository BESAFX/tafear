var app = angular.module('Application',
    [
        'ui.router',
        'ngAnimate',
        'toggle-switch',
        'jcs-autoValidate',
        'fm',
        'ngSanitize',
        'counter',
        'FBAngular',
        'ui.bootstrap',
        'angularCSS',
        'smart-table',
        'lrDragNDrop',
        'nya.bootstrap.select',
        'localytics.directives',
        'angularFileUpload',
        'ngLoadingSpinner',
        'ngStomp',
        'luegg.directives',
        'monospaced.elastic',
        'pageslide-directive',
        'ui.bootstrap.contextMenu',
        'kdate',
        'ui.sortable',
        'timer'
    ]);

app.factory('errorInterceptor', ['$q', '$rootScope', '$location', '$log',
    function ($q, $rootScope, $location, $log) {
        return {
            request: function (config) {
                return config || $q.when(config);
            },
            requestError: function (request) {
                return $q.reject(request);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response && response.status === 404) {
                }
                if (response && response.status >= 500) {
                    $rootScope.showTechnicalNotify("الدعم الفني", response.data.message, "error", "fa-ban");
                }
                return $q.reject(response);
            }
        };
    }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$cssProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $cssProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/home");

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('errorInterceptor');

        /**************************************************************
         *                                                            *
         * Home State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("home", {
            url: "/home",
            css: [
                '/ui/css/mdl-style.css',
                '/ui/css/theme-black.css'
            ],
            views: {
                '': {
                    templateUrl: "/ui/partials/home/home.html",
                    controller: "homeCtrl"
                },
                'incomingOperations@home': {
                    templateUrl: "/ui/partials/home/incomingOperations.html",
                    controller: "incomingOperationsCtrl"
                },
                'outgoingOperations@home': {
                    templateUrl: "/ui/partials/home/outgoingOperations.html",
                    controller: "outgoingOperationsCtrl"
                },
                'incomingTasks@home': {
                    templateUrl: "/ui/partials/home/incomingTasks.html",
                    controller: "incomingTasksCtrl"
                },
                'outgoingTasks@home': {
                    templateUrl: "/ui/partials/home/outgoingTasks.html",
                    controller: "outgoingTasksCtrl"
                },
                'closeRequests@home': {
                    templateUrl: "/ui/partials/home/closeRequests.html",
                    controller: "closeRequestsCtrl"
                },
                'closedSoonIncoming@home': {
                    templateUrl: "/ui/partials/home/closedSoonIncoming.html",
                    controller: "closedSoonIncomingCtrl"
                },
                'closedSoonOutgoing@home': {
                    templateUrl: "/ui/partials/home/closedSoonOutgoing.html",
                    controller: "closedSoonOutgoingCtrl"
                }
            }
        });

        /**************************************************************
         *                                                            *
         * Menu State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("menu", {
            url: "/menu",
            css: [
                '/ui/css/mdl-style.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/menu/menu.html",
            controller: "menuCtrl"
        });

        /**************************************************************
         *                                                            *
         * Company State                                              *
         *                                                            *
         *************************************************************/
        $stateProvider.state("company", {
            url: "/company",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/company/company.html",
            controller: "companyCtrl"
        });

        /**************************************************************
         *                                                            *
         * Region State                                               *
         *                                                            *
         *************************************************************/
        $stateProvider.state("region", {
            url: "/region",
            css: [
                '/ui/css/mdl-style-red-deep_orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/region/region.html",
            controller: "regionCtrl"
        });

        /**************************************************************
         *                                                            *
         * Branch State                                               *
         *                                                            *
         *************************************************************/
        $stateProvider.state("branch", {
            url: "/branch",
            css: [
                '/ui/css/mdl-style-light_green-lime.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/branch/branch.html",
            controller: "branchCtrl"
        });

        /**************************************************************
         *                                                            *
         * Department State                                           *
         *                                                            *
         *************************************************************/
        $stateProvider.state("department", {
            url: "/department",
            css: [
                '/ui/css/mdl-style-indigo-pink.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/department/department.html",
            controller: "departmentCtrl"
        });

        /**************************************************************
         *                                                            *
         * Employee State                                             *
         *                                                            *
         *************************************************************/
        $stateProvider.state("employee", {
            url: "/employee",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/employee/employee.html",
            controller: "employeeCtrl"
        });

        /**************************************************************
         *                                                            *
         * Person State                                               *
         *                                                            *
         *************************************************************/
        $stateProvider.state("person", {
            url: "/person",
            css: [
                '/ui/css/mdl-style-indigo-pink.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/person/person.html",
            controller: "personCtrl"
        });

        /**************************************************************
         *                                                            *
         * Team State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("team", {
            url: "/team",
            css: [
                '/ui/css/mdl-style-light_green-lime.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/team/team.html",
            controller: "teamCtrl"
        });

        /**************************************************************
         *                                                            *
         * Help State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("help", {
            url: "/help",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/help/help.html",
            controller: "helpCtrl"
        });

        /**************************************************************
         *                                                            *
         * Profile State                                              *
         *                                                            *
         *************************************************************/
        $stateProvider.state("profile", {
            url: "/profile",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/profile/profile.html",
            controller: "profileCtrl"
        });

        /**************************************************************
         *                                                            *
         * About State                                                *
         *                                                            *
         *************************************************************/
        $stateProvider.state("about", {
            url: "/about",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/about/about.html",
            controller: "aboutCtrl"
        });

        /**************************************************************
         *                                                            *
         * Task State                                                 *
         *                                                            *
         *************************************************************/
        $stateProvider.state("task", {
            url: "/task",
            css: [
                '/ui/css/mdl-style-green-orange.css',
                '/ui/css/theme-black.css'
            ],
            templateUrl: "/ui/partials/task/task.html",
            controller: "taskCtrl"
        });
    }
]);


