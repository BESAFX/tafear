app.factory("BranchService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/branch/findAll").then(function (response) {
                    return response.data;
                })
            },
            findOne: function (id) {
                return $http.get("/api/branch/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (branch) {
                return $http.post("/api/branch/create", branch).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/branch/delete/" + id);
            },
            update: function (branch) {
                return $http.put("/api/branch/update", branch).then(function (response) {
                    return response.data;
                });
            },
            fetchTableData: function () {
                return $http.get("/api/branch/fetchTableData").then(function (response) {
                    return response.data;
                });
            },
            fetchBranchCombo: function () {
                return $http.get("/api/branch/fetchBranchCombo").then(function (response) {
                    return response.data;
                });
            },
            fetchBranchRegionCompanyCombo: function () {
                return $http.get("/api/branch/fetchBranchRegionCompanyCombo").then(function (response) {
                    return response.data;
                });
            }
        };
    }]);