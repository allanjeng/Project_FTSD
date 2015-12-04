app.controller('projectManageCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $log) {
    if ($scope.projects === undefined) {
        Data.post('getProjects', {}).then(function (results) {
            $scope.project = results.projects
        });
    }
    
    $scope.changeName = function () {
        var r = confirm("Are you sure?");
        if(r==true){
            var splitted = $scope.project.project.split(":")
            $scope.ID = splitted[2].split("\"")[1]
            $log.error($scope.ID)
            Data.post('changeName', {
                projectName: $scope.project.projectName,
                projectId: $scope.ID
            }).then(function (results) {
                Data.toast(results);
            });
        }else{
            x="canceled.";
        }
    }
    $scope.updateModel = function(){
        $location.path( "/questionnaire" );
        var splitted = $scope.project.project.split(":")
        $rootScope.projectID = splitted[2].split("\"")[1]
    }
});