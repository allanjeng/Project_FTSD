app.controller('forgotPasswordCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {

    $scope.submitEmail = function(){
      Data.post('forgotPassword', {
          email: $scope.email
      }).then(function (results) {
          Data.toast(results);
          if (results.status == "success") {
              $location.path('login');
          }
      });
    };
});


app.controller('resetPasswordCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {
    $scope.key = $routeParams.key
    $scope.submitNewPassword = function(){
      Data.post('resetPassword', {
          password: $scope.password,
          key: $scope.key
      }).then(function (results) {
          Data.toast(results);
          if (results.status == "success") {
              $location.path('login');
          }
      });
    };
});
