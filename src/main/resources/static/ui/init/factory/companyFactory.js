app.factory("CompanyService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/company/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/company/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (company) {
                return $http.post("/api/company/create", company).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/company/delete/" + id);
            },
            update: function (company) {
                return $http.put("/api/company/update", company).then(function (response) {
                    return response.data;
                });
            },
            count: function () {
                return $http.get("/api/company/count").then(function (response) {
                    return response.data;
                });
            },
            fetchTableData: function () {
                return $http.get("/api/company/fetchTableData").then(function (response) {
                    return response.data;
                });
            },
            fetchTableDataSummery: function () {
                return $http.get("/api/company/fetchTableDataSummery").then(function (response) {
                    return response.data;
                });
            },
            uploadCompanyLogo: function (file) {
                var fd = new FormData();
                fd.append('file', file);
                return $http.post("/uploadCompanyLogo", fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined}}).then(function (response) {
                    return response.data;
                });
            },
            activateWarnMessage: function () {
                return $http.get("/api/company/activateWarnMessage").then(function (response) {
                    return response.data;
                });
            },
            deactivateWarnMessage: function () {
                return $http.get("/api/company/deactivateWarnMessage").then(function (response) {
                    return response.data;
                });
            },
            activateDeductionMessage: function () {
                return $http.get("/api/company/activateDeductionMessage").then(function (response) {
                    return response.data;
                });
            },
            deactivateDeductionMessage: function () {
                return $http.get("/api/company/deactivateDeductionMessage").then(function (response) {
                    return response.data;
                });
            },
            setEmailDeductionOptions: function (emailDeductionOptions) {
                return $http.put("/api/company/setEmailDeductionOptions", emailDeductionOptions).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);