app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/menu.html"
    })
    .when("/auth", {
        templateUrl: "templates/auth.html"
    })
    .when("/weather", {
        templateUrl: "templates/weather.html"
    })
    .when("/viacep", {
        templateUrl: "templates/viacep.html"
    });
});