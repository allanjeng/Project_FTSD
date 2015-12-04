app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $log) {
    //initially set those objects to null to avoid undefined error
    //
    //
    //
    if ($routeParams.key){
      Data.post('validate', {
          key: $routeParams.key
      }).then(function (results) {
          Data.toast(results);
      });
    }

    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    /*
    $scope.projectManage = function(){
        Data.post('projectManage',{
            }).then(function (results){
            if (results.status == "success"){
                $rootScope['projectName'] = results.projectName;
                $rootScope['projectModel'] = results.projectModel;
                $rootScope['projectDesc'] = results.projectDesc;
                $location.path('projectManage');
            }
        });
    };
    */
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('login');
            }
        });
    };

    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
});
