app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
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
    }
});


app.controller('projectBuilderCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
  // $scope.id = $routeParams.id
    $scope.form = {};
    $scope.steps = [{
        title:"Step 1",
        active:true,
        visited:true
    },{
        title:"Step 2",
        active:false,
        visited:false
    },{
        title:"Step 3",
        active:false,
        visited:false
    }];

    $scope.setActiveTab = function($index){
        $scope.steps.forEach(function(step,index){
            step.active = false;
        });
        $scope.steps[$index].active = true;
        $scope.steps[$index].visited = true;
    };
    $scope.setVisitedTab = function($index){
        $scope.steps[$index].visited = true;
    };
    $scope.saveProject = function(){
      /*  $http({ method: 'POST',
                url: '/someUrl'
                data: {id:$routeParams.id,
                       formValues:$scope.form}
                }).then(function successCallback(response) {
                    $location.path( "/project_builder/" + response.id );
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });  */

       $location.path( "/dashboard" );
    };
});
