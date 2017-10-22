app.run(['$http', '$location', '$state', '$stateParams', '$timeout', '$window', 'PersonService', 'TaskService', '$rootScope', '$log', '$css', '$stomp', 'defaultErrorMessageResolver', 'ModalProvider', 'Fullscreen',
    function ($http, $location, $state, $stateParams, $timeout, $window, PersonService, TaskService, $rootScope, $log, $css, $stomp, defaultErrorMessageResolver, ModalProvider, Fullscreen) {

        $rootScope.state = $state;
        $rootScope.stateParams = $stateParams;

        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['fieldRequired'] = 'هذا الحقل مطلوب';
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            $.noty.clearQueue(); // Clears the notification queue
            $.noty.closeAll(); // Close all notifications
            switch (toState.name) {
                case 'home': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'dashboard';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'menu': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'widgets';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'company': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'business';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-purple-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'region': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'place';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-lime-orange.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'branch': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'layers';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-indigo-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'department': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'store';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-grey-deep_orange.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'employee': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'person_pin';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-indigo-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'team': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'security';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-green-orange.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'person': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'lock';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-brown-deep_orange.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'profile': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'account_circle';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-light_green-lime.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'task': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'assignment';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-red-deep_orange.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'reportModel': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'print';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-indigo-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'help': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'help';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-indigo-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
                case 'about': {
                    $rootScope.applyTitleLang();
                    $rootScope.MDLIcon = 'info';
                    $css.removeAll();
                    $css.add([
                        '/ui/css/mdl-style-indigo-pink.css',
                        '/ui/css/theme-black.css'
                    ]);
                    $rootScope.applyCssLang();
                    break;
                }
            }
        });

        $rootScope.contains = function (list, values) {
            return list ? _.intersection(values, list.split(',')).length > 0 : false;
        };

        $rootScope.logout = function () {
            $http.post('/logout');
            $window.location.href = '/logout';
        };

        $rootScope.dateType = 'H';

        $rootScope.lang = 'AR';

        $rootScope.switchDateType = function () {
            $rootScope.dateType === 'H' ? $rootScope.dateType = 'G' : $rootScope.dateType = 'H';
            PersonService.setDateType($rootScope.dateType);
        };

        $rootScope.switchLang = function () {
            switch ($rootScope.lang) {
                case 'AR':
                    $rootScope.lang = 'EN';
                    $css.remove('/ui/css/style.css');
                    $css.add('/ui/css/style-en.css');
                    break;
                case 'EN':
                    $rootScope.lang = 'AR';
                    $css.remove('/ui/css/style-en.css');
                    $css.add('/ui/css/style.css');
                    break;
            }
            $rootScope.applyTitleLang();
            window.componentHandler.upgradeAllRegistered();
            PersonService.setGUILang($rootScope.lang);
            $rootScope.state.reload();
        };

        $rootScope.applyTitleLang = function () {
            $timeout(function () {
                switch ($rootScope.state.current.name) {
                    case 'home':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الرئيسية';
                        } else {
                            $rootScope.pageTitle = 'Dashboard';
                        }
                        break;
                    case 'menu':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'البرامج';
                        } else {
                            $rootScope.pageTitle = 'Application';
                        }
                        break;
                    case 'company':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الشركة';
                        } else {
                            $rootScope.pageTitle = 'Company';
                        }
                        break;
                    case 'region':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'المناطق';
                        } else {
                            $rootScope.pageTitle = 'Regions';
                        }
                        break;
                    case 'branch':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الفروع';
                        } else {
                            $rootScope.pageTitle = 'Branches';
                        }
                        break;
                    case 'department':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الأقسام';
                        } else {
                            $rootScope.pageTitle = 'Departments';
                        }
                        break;
                    case 'employee':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الموظفون';
                        } else {
                            $rootScope.pageTitle = 'Employees';
                        }
                        break;
                    case 'team':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الصلاحيات';
                        } else {
                            $rootScope.pageTitle = 'Privileges';
                        }
                        break;
                    case 'person':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'المستخدمون';
                        } else {
                            $rootScope.pageTitle = 'Users';
                        }
                        break;
                    case 'profile':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'الملف الشخصي';
                        } else {
                            $rootScope.pageTitle = 'Profile';
                        }
                        break;
                    case 'task':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'المهام';
                        } else {
                            $rootScope.pageTitle = 'Tasks';
                        }
                        break;
                    case 'reportModel':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'نماذج التقارير';
                        } else {
                            $rootScope.pageTitle = 'Report Customization';
                        }
                        break;
                    case 'help':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'المساعدة';
                        } else {
                            $rootScope.pageTitle = 'Help';
                        }
                        break;
                    case 'about':
                        if ($rootScope.lang === 'AR') {
                            $rootScope.pageTitle = 'عن البرنامج';
                        } else {
                            $rootScope.pageTitle = 'About';
                        }
                        break;
                }
            }, 1000);
        };

        $rootScope.applyCssLang = function () {
            switch ($rootScope.lang) {
                case 'AR':
                    $css.remove('/ui/css/style-en.css');
                    $css.add('/ui/css/style.css');
                    break;
                case 'EN':
                    $css.remove('/ui/css/style.css');
                    $css.add('/ui/css/style-en.css');
                    break;
            }
            $timeout(function () {
                window.componentHandler.upgradeAllRegistered();
            }, 1500);
        };

        $rootScope.goFullscreen = function () {
            if (Fullscreen.isEnabled())
                Fullscreen.cancel();
            else
                Fullscreen.all();
        };

        $rootScope.ModalProvider = ModalProvider;

        $rootScope.fetchTasksClosedThisWeek = function () {
            var search = [];
            search.push('isTaskOpen=');
            search.push(true);
            search.push('&');
            search.push('taskType=');
            search.push(true);
            search.push('&');
            search.push('person=');
            search.push($rootScope.me.id);
            search.push('&');
            search.push('timeType=');
            search.push('Week');
            search.push('&');
            TaskService.filter(search.join("")).then(function (data) {
                $rootScope.me.tasksClosedThisWeek = data;
            })
        };

        $rootScope.me = {};
        PersonService.findActivePerson().then(function (data) {
            $rootScope.me = data;
            $rootScope.options = JSON.parse($rootScope.me.options);
            $rootScope.lang = $rootScope.options.lang;
            $rootScope.dateType = $rootScope.options.dateType;
            $rootScope.applyTitleLang();
            $rootScope.applyCssLang();
            window.componentHandler.upgradeAllRegistered();
            $rootScope.state.reload();
            PersonService.findActivePersonManagerSummery().then(function (data) {
                $rootScope.me.manager = data;
                $rootScope.fetchTasksClosedThisWeek();
            });
        });

        $rootScope.showNotify = function (title, message, type, icon) {
            noty({
                layout: 'topLeft',
                theme: 'metroui', // or relax
                type: type, // success, error, warning, information, notification
                text: '<div class="activity-item text-right"><span>' + title + '</span> <i class="fa ' + icon + '"></i><div class="activity">' + message + '</div></div>',
                dismissQueue: true, // [boolean] If you want to use queue feature set this true
                force: true, // [boolean] adds notification to the beginning of queue when set to true
                maxVisible: 3, // [integer] you can set max visible notification count for dismissQueue true option,
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                timeout: 1500, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
                progressBar: true, // [boolean] - displays a progress bar
                animation: {
                    open: 'animated fadeIn',
                    close: 'animated fadeOut',
                    easing: 'swing',
                    speed: 100 // opening & closing animation speed
                },
                closeWith: ['hover'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                modal: false, // [boolean] if true adds an overlay
                killer: false, // [boolean] if true closes all notifications and shows itself
                callback: {
                    onShow: function () {
                    },
                    afterShow: function () {
                    },
                    onClose: function () {
                    },
                    afterClose: function () {
                    },
                    onCloseClick: function () {
                    },
                },
                buttons: false // [boolean|array] an array of buttons, for creating confirmation dialogs.
            });
        };

        $rootScope.showConfirmNotify = function (title, message, type, icon, callback) {
            noty({
                layout: 'center',
                theme: 'metroui', // or relax
                type: type, // success, error, warning, information, notification
                text: '<div class="activity-item text-right"><span>' + title + '</span> <i class="fa ' + icon + '"></i><div class="activity">' + message + '</div></div>',
                dismissQueue: true, // [boolean] If you want to use queue feature set this true
                force: false, // [boolean] adds notification to the beginning of queue when set to true
                maxVisible: 3, // [integer] you can set max visible notification count for dismissQueue true option,
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                timeout: false, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
                progressBar: true, // [boolean] - displays a progress bar
                animation: {
                    open: 'animated fadeIn',
                    close: 'animated fadeOut',
                    easing: 'swing',
                    speed: 100 // opening & closing animation speed
                },
                closeWith: ['button'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                modal: true, // [boolean] if true adds an overlay
                killer: false, // [boolean] if true closes all notifications and shows itself
                callback: {
                    onShow: function () {
                    },
                    afterShow: function () {
                    },
                    onClose: function () {
                    },
                    afterClose: function () {
                    },
                    onCloseClick: function () {
                    },
                },
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'نعم', onClick: function ($noty) {
                        $noty.close();
                        callback();
                    }
                    },
                    {
                        addClass: 'btn btn-danger', text: 'إلغاء', onClick: function ($noty) {
                        $noty.close();
                    }
                    }
                ]
            });
        };

        $rootScope.showTechnicalNotify = function (title, message, type, icon) {
            noty({
                layout: 'center',
                theme: 'metroui', // or relax
                type: type, // success, error, warning, information, notification
                text: '<div class="activity-item text-right"><span>' + title + '</span> <i class="fa ' + icon + '"></i><div class="activity">' + message + '</div></div>',
                dismissQueue: true, // [boolean] If you want to use queue feature set this true
                force: false, // [boolean] adds notification to the beginning of queue when set to true
                maxVisible: 3, // [integer] you can set max visible notification count for dismissQueue true option,
                template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
                timeout: false, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
                progressBar: true, // [boolean] - displays a progress bar
                animation: {
                    open: 'animated fadeIn',
                    close: 'animated fadeOut',
                    easing: 'swing',
                    speed: 100 // opening & closing animation speed
                },
                closeWith: ['button'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                modal: true, // [boolean] if true adds an overlay
                killer: true, // [boolean] if true closes all notifications and shows itself
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'إعادة تحميل الصفحة', onClick: function ($noty) {
                        $noty.close();
                        location.reload(true);
                    }
                    },
                    {
                        addClass: 'btn btn-danger', text: 'إغلاق', onClick: function ($noty) {
                        $noty.close();
                    }
                    }
                ]
            });
        };

        /**************************************************************
         *                                                            *
         * STOMP Connect                                              *
         *                                                            *
         *************************************************************/
        $rootScope.chats = [];
        $stomp.connect('/ws').then(function () {
            $stomp.subscribe('/user/queue/notify', function (payload, headers, res) {
                $rootScope.showNotify(payload.title, payload.message, payload.type, payload.icon);
            }, {'headers': 'notify'});
        });
        $rootScope.today = new Date();

        /**************************************************************
         *                                                            *
         * Navigation Callers                                         *
         *                                                            *
         *************************************************************/
        $rootScope.goToCompany = function () {
            $state.go('company');
        };
        $rootScope.goToRegion = function () {
            $state.go('region');
        };
        $rootScope.goToBranch = function () {
            $state.go('branch');
        };
        $rootScope.goToDepartment = function () {
            $state.go('department');
        };
        $rootScope.goToEmployee = function () {
            $state.go('employee');
        };
        $rootScope.goToTeam = function () {
            $state.go('team');
        };
        $rootScope.goToPerson = function () {
            $state.go('person');
        };
        $rootScope.goToReportModel = function () {
            $state.go('reportModel');
        };
        $rootScope.goToTask = function () {
            $state.go('task');
        };
        $rootScope.goToHome = function () {
            $state.go('home');
        };
        $rootScope.goToHelp = function () {
            $state.go('help');
        };
        $rootScope.goToProfile = function () {
            $state.go('profile');
        };
        $rootScope.goToAbout = function () {
            $state.go('about');
        };

    }]);