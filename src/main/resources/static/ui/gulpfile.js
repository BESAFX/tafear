var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var strip = require('gulp-strip-comments');
var replace = require('gulp-replace');


gulp.task('css', function () {

    gulp.src([
        './css/animate.css',
        './css/animation.css',
        './css/bootstrap.css',
        './css/fonts.css',
        './css/md-icons.css',
        './css/angular-toggle-switch-bootstrap-3.css',
        './css/highlight.css',
        './css/chat.css',
        './bootstrap-select/css/nya-bs-select.css',
        './css/font-awesome-animation.css',
        './kdate/css/jquery.calendars.picker.css',
        './chosen/chosen.css',
        './css/mdl-style.css',
        './css/theme-black.css',
        './css/style.css'
    ])
        .pipe(replace('/*!', '/*'))
        .pipe(concat('app.css'))
        .pipe(cleanCSS({specialComments : 'all'}))
        .pipe(gulp.dest('./'));

});

gulp.task('scripts', function () {

    gulp.src([

        './js/material.js',
        './js/fontawesome.js',
        './js/jquery.js',

        './kdate/js/jquery.calendars.js',
        './kdate/js/jquery.calendars-ar.js',
        './kdate/js/jquery.calendars-ar-EG.js',
        './kdate/js/jquery.plugin.js',
        './kdate/js/jquery.calendars.picker.js',
        './kdate/js/jquery.calendars.picker-ar.js',
        './kdate/js/jquery.calendars.picker-ar-EG.js',
        './kdate/js/jquery.calendars.picker.lang.js',
        './kdate/js/jquery.calendars.ummalqura.js',
        './kdate/js/jquery.calendars.ummalqura-ar.js',
        './kdate/js/jquery.calendars.plus.js',

        './js/jquery-ui.js',
        './js/angular.js',
        './js/angular-locale_ar.js',
        './js/angular-sanitize.js',
        './js/angular-ui-router.js',
        './js/angular-animate.js',
        './js/angular-touch.js',

        './angular-spinner/spin.js',
        './angular-spinner/angular-spinner.js',
        './angular-spinner/angular-loading-spinner.js',

        './js/ui-bootstrap.js',
        './js/ui-bootstrap-tpls.js',

        './sockjs/sockjs.js',
        './stomp-websocket/lib/stomp.js',
        './ng-stomp/ng-stomp.js',
        './kdate/kdate.module.js',
        './kdate/kdate.filter.js',
        './kdate/kdate.picker.js',
        './js/underscore.js',
        './js/lrDragNDrop.js',
        './js/contextMenu.js',
        './js/lrStickyHeader.js',
        './js/smart-table.js',
        './js/stStickyHeader.js',
        './js/angular-pageslide-directive.js',
        './js/elastic.js',
        './js/scrollglue.js',
        './ng-upload/angular-file-upload.js',
        './bootstrap-select/js/nya-bs-select.js',
        './js/angular-css.js',
        './js/angular-timer-all.js',
        './full-screen/angular-fullscreen.js',
        './animate-counter/angular-counter.js',
        './js/angular-focusmanager.js',
        './js/jcs-auto-validate.js',
        './js/angular-toggle-switch.js',
        './js/chosen.jquery.js',
        './chosen/angular-chosen.js',
        './js/sortable.js',
        './js/FileSaver.js',
        './js/jquery.noty.packaged.js',

        './init/config/config.js',
        './init/factory/branchFactory.js',
        './init/factory/companyFactory.js',
        './init/factory/departmentFactory.js',
        './init/factory/employeeFactory.js',
        './init/factory/fileFactory.js',
        './init/factory/personFactory.js',
        './init/factory/regionFactory.js',
        './init/factory/roleFactory.js',
        './init/factory/screenFactory.js',
        './init/factory/taskFactory.js',
        './init/factory/taskOperationAttachFactory.js',
        './init/factory/taskOperationFactory.js',
        './init/factory/taskWarnFactory.js',
        './init/factory/taskDeductionFactory.js',
        './init/factory/taskCloseRequestFactory.js',
        './init/factory/taskToFactory.js',
        './init/factory/teamFactory.js',
        './init/factory/reportModelFactory.js',

        './init/service/service.js',
        './init/directive/directive.js',
        './init/filter/filter.js',
        './init/run/run.js',

        './partials/home/home.js',
        './partials/menu/menu.js',
        './partials/home/incomingTasks.js',
        './partials/home/incomingOperations.js',
        './partials/home/outgoingOperations.js',
        './partials/home/outgoingTasks.js',
        './partials/home/closeRequests.js',
        './partials/home/closedSoonIncoming.js',
        './partials/home/closedSoonOutgoing.js',
        './partials/chat/chat.js',
        './partials/company/company.js',
        './partials/company/companyCreateUpdate.js',
        './partials/employee/employee.js',
        './partials/employee/employeeCreateUpdate.js',
        './partials/branch/branch.js',
        './partials/branch/branchCreateUpdate.js',
        './partials/region/region.js',
        './partials/region/regionCreateUpdate.js',
        './partials/department/department.js',
        './partials/department/departmentCreateUpdate.js',

        './partials/task/task.js',
        './partials/task/taskCreateUpdate.js',
        './partials/task/taskOperationCreate.js',
        './partials/task/taskWarnCreate.js',
        './partials/task/taskDeductionCreate.js',
        './partials/task/taskToCreate.js',
        './partials/task/taskToRemove.js',
        './partials/task/taskToOpen.js',
        './partials/task/taskDetails.js',
        './partials/task/taskWarns.js',
        './partials/task/taskDeductions.js',
        './partials/task/taskFilter.js',
        './partials/task/taskRequestClose.js',
        './partials/task/taskProgress.js',
        './partials/task/taskClosed.js',
        './partials/task/taskExtension.js',
        './partials/task/clearCounters.js',


        './partials/team/team.js',
        './partials/team/teamCreateUpdate.js',
        './partials/person/person.js',
        './partials/person/personCreateUpdate.js',
        './partials/reportModel/reportModel.js',
        './partials/reportModel/reportModelCreateUpdate.js',

        './partials/report/task/taskOperationsIn.js',
        './partials/report/task/taskTosIn.js',
        './partials/report/task/tasksIn.js',
        './partials/report/person/personsIn.js',
        './partials/report/task/incomingTasksDeductions.js',
        './partials/report/task/outgoingTasksDeductions.js',
        './partials/report/task/tasksClosedSoon.js',
        './partials/report/task/outgoingTasksOperationsToday.js',
        './partials/report/task/watchTasksOperations.js',

        './partials/help/help.js',
        './partials/profile/profile.js'

    ])
        .pipe(strip())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))

});

gulp.task('default', ['css', 'scripts']);