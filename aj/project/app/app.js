var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/forgot_password', {
                title: 'ForgotPassword',
                templateUrl: 'partials/forgot_password.html',
                controller: 'forgotPasswordCtrl'
            })
            .when('/reset_password/:key', {
                title: 'ResetPassword',
                templateUrl: 'partials/reset_password.html',
                controller: 'resetPasswordCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/project_builder', {
                title: 'Create Project',
                templateUrl: 'partials/project_builder.html',
                controller: 'projectBuilderCtrl'
            })
            .when('/project_builder/:id', {
                title: 'Create Project',
                templateUrl: 'partials/project_builder.html',
                controller: 'projectBuilderCtrl'
            })
            .when('/login/:key', {
                title: 'Login',
                controller: 'authCtrl',
                templateUrl: 'partials/login.html'
            })
            .when('/team_member_role_management', {
                title: 'Role Management',
                controller: 'roleManagementCtrl',
                templateUrl: 'partials/team_member_role_management.html'
            })
            .when('/user_managment', {
                title: 'User Management',
                controller: 'userManagmentCtrl',
                templateUrl: 'partials/user_managment.html'
            })
            .when('/project_management', {
                title: 'Project Management',
                controller: 'projectManageCtrl',
                templateUrl: 'partials/project_management.html'
            })
            .when('/questionnaire', {
                title: 'Questionnaire',
                controller: 'questionnaireCtrl',
                templateUrl: 'partials/questionnaire.html'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.role = results.role;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });
