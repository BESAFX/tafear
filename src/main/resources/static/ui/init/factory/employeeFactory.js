app.factory("EmployeeService",
    ['$http', '$log', function ($http, $log) {
        return {
            findAll: function () {
                return $http.get("/api/employee/findAll").then(function (response) {
                    return response.data;
                });
            },
            findOne: function (id) {
                return $http.get("/api/employee/findOne/" + id).then(function (response) {
                    return response.data;
                });
            },
            create: function (employee) {
                return $http.post("/api/employee/create", employee).then(function (response) {
                    return response.data;
                });
            },
            remove: function (id) {
                return $http.delete("/api/employee/delete/" + id);
            },
            update: function (employee) {
                return $http.put("/api/employee/update", employee).then(function (response) {
                    return response.data;
                });
            },
            fetchTableData: function () {
                return $http.get("/api/employee/fetchTableData").then(function (response) {
                    return response.data;
                });
            },
            fetchEmployeeCombo: function () {
                return $http.get("/api/employee/fetchEmployeeCombo").then(function (response) {
                    return response.data;
                });
            }
        };
    }]);