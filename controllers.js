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
    $scope.has_error = false;
    
    $scope.get_info = function () {
        let final_url = url.replace("?", $scope.cep);
        
        $http.get(final_url)
            .then(function (response) {
                $scope.has_error = false;
                $scope.response = response.data;
            },
            function (response) {
                $scope.has_error = true;
                $scope.response = "ERRO";
            });
    };
});

app.controller("weather", function ($scope, $http) {
    let url = "http://api.weatherapi.com/v1";
    let token = "9f10c5cc782e420b89b210825210710";
    $scope.weather = {
        day: null,
        icon: null,
        temperature_c: ""
    };
    $scope.search_results = [];
    
    $scope.search_city = function () {
        let final_url = url + "/search.json";
        let city = $scope.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let config = {
            params: {
                key: token,
                q: city
            }
        };
        
        $http.get(final_url, config).then(function (response) {
            $scope.search_results = response.data;
        });
    };
    
    $scope.get_info = function () {
        let final_url = url + "/current.json";
        let city = $scope.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let config = {
            params: {
                key: token,
                q: city
            }
        };
        
        $http.get(final_url, config).then(function (response) {
            $scope.response = response.data;
            let location_data = response.data.location;
            let weather_data = response.data.current;
            
            $scope.weather.temperature_c = weather_data.temp_c;
            $scope.weather.day = weather_data.is_day;
            $scope.weather.icon = weather_data.condition.icon;
        });
    };
});

/*

{"location":
    {"name":"Riberalta","region":"El Beni","country":"Bolivia","lat":-10.98,"lon":-66.1,"tz_id":"America/La_Paz","localtime_epoch":1657108732,"localtime":"2022-07-06 7:58"
    },
    "current":{"last_updated_epoch":1657107900,"last_updated":"2022-07-06 07:45","temp_c":23,"temp_f":73.4,"is_day":1,"condition":{"text":"Fog","icon":"//cdn.weatherapi.com/weather/64x64/day/248.png","code":1135
    },
    "wind_mph":2.2,"wind_kph":3.6,"wind_degree":10,"wind_dir":"N","pressure_mb":1013,"pressure_in":29.91,"precip_mm":0,"precip_in":0,"humidity":100,"cloud":75,"feelslike_c":25.1,"feelslike_f":77.2,"vis_km":0.3,"vis_miles":0,"uv":1,"gust_mph":4.7,"gust_kph":7.6
    }
}
*/