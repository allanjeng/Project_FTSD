app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);

app.directive('createProject', ['$location','$http',function ($location,$http) {
    return {
        restrict: 'E',
        scope:true,
        templateUrl:'partials/create_project.html',
        link: function (scope, elem , attrs,control) {
            scope.projectName="";
            scope.createProject = function(){

            /*  $http({ method: 'POST',
                      url: '/someUrl'
                      data: {projectName:scope.projectName}
                      }).then(function successCallback(response) {
                          $location.path( "/project_builder/" + response.id );
                      }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                      });  */
               console.log($location,$http);
               $location.path( "/project_builder" );
            }.bind(this);
        }
    };
}]);
