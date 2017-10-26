app.controller('taskOperationCreateCtrl', ['TaskService', 'TaskOperationService', 'TaskOperationAttachService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'task',
    function (TaskService, TaskOperationService, TaskOperationAttachService, $scope, $rootScope, $timeout, $log, $uibModalInstance, task) {

        $scope.taskOperation = {};
        $scope.taskOperation.task = task;
        $scope.files = [];

        $scope.submit = function () {
            TaskOperationService.create($scope.taskOperation).then(function (data) {
                $scope.taskOperation = data;
                $scope.taskOperation.task = task;
                $scope.uploadAll();
                $uibModalInstance.close(data);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //////////////////////////File Manager///////////////////////////////////
        $scope.uploadFiles = function () {
            document.getElementById('uploader').click();
        };

        $scope.uploadAll = function () {
            if($scope.files.length > 0){
                $rootScope.showNotify("المهام", "جاري رفع الملفات، فضلاً انتظر قليلاً", "warning", "fa-black-tie");
                angular.forEach($scope.files, function (file) {
                    TaskOperationAttachService.upload($scope.taskOperation, file).then(function (data) {
                        file.link = data.link;
                    });
                });
            }
        };
        //////////////////////////File Manager///////////////////////////////////

        //////////////////////////Scan Manager///////////////////////////////////
        $scope.scanToJpg = function() {
            scanner.scan(displayImagesOnPage,
                {
                    "output_settings" :
                        [
                            {
                                "type": "return-base64",
                                "format": "jpg"
                            }
                        ]
                }
            );
        };

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }

        /** Processes the scan result */
        function displayImagesOnPage(successful, mesg, response) {
            var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
            for(var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
                var scannedImage = scannedImages[i];
                var blob = dataURItoBlob(scannedImage.src);
                var file = new File([blob], Math.floor((Math.random() * 50000) + 1) + '.jpg');
                $scope.files.push(file);
            }
        }
        //////////////////////////Scan Manager///////////////////////////////////

        $timeout(function () {
            window.componentHandler.upgradeAllRegistered();
        }, 1500);

    }]);