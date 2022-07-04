app.controller("login", function($scope) {
    $scope.auth = function () {
        let correct_email = "a";
        let correct_password = "b";
        
        if($scope.email == correct_email && $scope.password == correct_password) {
            $scope.response = "Success";
        }
        else {
            $scope.response = "Fail";
        }
    };
});

app.controller("viacep", function ($scope, $http) {
    let url = "https://viacep.com.br/ws/?/json/";
    
    $scope.get_info = function () {
        let final_url = url.replace("?", $scope.cep);
        
        $http.get(final_url)
            .then(function (response) {
                $scope.response = response.data;
            },
            function (response) {
                $scope.response = "ERRO";
            });
    };
});