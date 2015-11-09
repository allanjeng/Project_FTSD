app.controller('roleManagementCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {

});


app.controller('userManagmentCtrl', function ($scope, $rootScope, $routeParams, $location, $log, $http, Data) {
  if ($scope.companies === undefined) {
    Data.post('getCompanies', {
    }).then(function (results) {
        $scope.company = results.companies
        var arr = [];
        $scope.company.forEach(function(entry) {
            arr.push(entry[0]);
        });
        $scope.companies = arr
    });
  }

  $scope.addTeamLeadID = function () {
    Data.post('addTeamLeadID', {
        teamleadid: $scope.teamleadid
    }).then(function (results) {
        Data.toast(results);
    });
  }

  $scope.submitCompany = function (comp) {
    Data.post('getUsers', {
      company:$scope.comp
    }).then(function (results) {
        $scope.tl = results.tl
        $scope.tm = results.tm
        var tl_arr = [];
        if ($scope.tl != 0) {
          $scope.tl.forEach(function(entry) {
              tl_arr.push(entry[0]);
          });
        }
        var tm_arr = [];
        if ($scope.tm != 0) {
          $scope.tm.forEach(function(entry) {
              tm_arr.push(entry[0]);
          });
        }
        $scope.teamleaders = tl_arr
        $scope.teammembers = tm_arr
        Data.toast(results)
    });
  }

  $scope.promoteTL = function (comp) {
    Data.post('promoteTL', {
      tl:$scope.teamleader
    }).then(function (results) {
      Data.toast(results)
    });
  }

  $scope.promoteTM = function (comp) {
    Data.post('promoteTM', {
      tm:$scope.teammember
    }).then(function (results) {
      Data.toast(results)
    });
  }

  $scope.submitCompanyM = function (comp) {
    Data.post('getUsersM', {
      company:$scope.compM
    }).then(function (results) {
        $scope.tlM = results.tl
        $scope.tmM = results.tm
        var tl_arrM = [];
        if ($scope.tlM != 0) {
          $scope.tlM.forEach(function(entry) {
              tl_arrM.push(entry[0]);
          });
        }
        var tm_arrM = [];
        if ($scope.tmM != 0) {
          $scope.tmM.forEach(function(entry) {
              tm_arrM.push(entry[0]);
          });
        }
        $scope.teamleadersM = tl_arrM
        $scope.teamnamesM = tm_arrM
        Data.toast(results)
    });
  }
});
