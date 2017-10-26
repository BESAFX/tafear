app.factory("TaskOperationAttachService",
    ['$http', '$log', function ($http, $log) {
        return {
            upload: function (taskOperation, file) {
                var fd = new FormData();
                fd.append('file', file);
                return $http.post("/api/taskOperationAttach/upload/" + taskOperation.id, fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined}}).then(function (response) {
                    return response.data;
                });
            },
            remove: function (attach) {
                return $http.delete("/api/taskOperationAttach/delete/" + attach.id);
            },
            findByTaskOperation: function (taskOperation) {
                return $http.get("/api/taskOperationAttach/findByTaskOperation/" + taskOperation.id).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);