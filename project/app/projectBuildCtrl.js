app.controller('projectBuilderCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $log) {
    
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

    $scope.getNameandDesc = function(){
        $scope.projectNameSet = document.getElementById("projectName").value
        $scope.projectDescSet = document.getElementById("projectDesc").value
        $scope.uid = document.getElementById("uid").textContent;
    }

    $scope.setActiveTab = function($index){
        $scope.steps.forEach(function(step,index){
            step.active = false;
        });
        $scope.steps[$index].active = true;
        $scope.steps[$index].visited = true;
    }
    $scope.setVisitedTab = function($index){
        $scope.steps[$index].visited = true;
    }
    //$scope.model = {choice: '$rootScope.option1'};
    $scope.models = ['Waterfall', 'RAD', 'Agile', "Prototyping", "Optimized Waterfall"]
    $scope.saveProject = function(){
        var r = confirm("Are you sure?");
        if(r==true){
            var choice = document.getElementById("choice");
            var selected = choice.options[choice.selectedIndex].text;

            Data.post('createProject', {
                projectModel: selected,
                projectName: $scope.projectNameSet,
                projectDes: $scope.projectDescSet,
                projectOwner: $scope.uid
            }).then(function (results) {
                Data.toast(results);
            });
            $location.path( "/dashboard" );   
        }else{
            x="canceled.";
        }
    }
    
    $scope.calculatePoints = function(model){

        var modelScore = {"Waterfall" : 0, "Optimized_Waterfall" : 0,"RAD" : 0, "Prototyping" : 0, "Agile" : 0};
        
        if(model.question1=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 5;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 5;
            modelScore.RAD = modelScore.RAD + 5;
            modelScore.Prototyping = modelScore.Prototyping + 5;
            modelScore.Agile = modelScore.Agile + 5;
        }
        if(model.question2=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 3;
            modelScore.RAD = modelScore.RAD + 4;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 4;
        }
        if(model.question3=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 4;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 5;
            modelScore.RAD = modelScore.RAD + 3;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
        }
        if(model.question4=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 5;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 4;
            modelScore.RAD = modelScore.RAD + 3;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 1;
        }
        if(model.question5=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 5;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 5;
            modelScore.Prototyping = modelScore.Prototyping + 4;
            modelScore.Agile = modelScore.Agile + 4;
        }
        if(model.question6=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 4;
            modelScore.RAD = modelScore.RAD + 5;
            modelScore.Prototyping = modelScore.Prototyping + 3;
            modelScore.Agile = modelScore.Agile + 2;
        }
        if(model.question7=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 5;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 3;
            modelScore.RAD = modelScore.RAD + 5;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 4;
        }
        if(model.question8=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 5;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 5;
            modelScore.Agile = modelScore.Agile + 2;
        }
        if(model.question9=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 5;
            modelScore.RAD = modelScore.RAD +4 ;
            modelScore.Prototyping = modelScore.Prototyping + 5;
            modelScore.Agile = modelScore.Agile + 2;
        }
        /*
        if(model.question10=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question11=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question12=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question13=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question14=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question15=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question16=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question17=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question18=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question19=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question20=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question21=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question22=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question23=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question24=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question25=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question26=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question27=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question28=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }

        if(model.question29=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question30=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question31=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question32=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question33=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question34=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question35=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question36=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question37=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question38=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }

        if(model.question39=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question40=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question41=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question42=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question43=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question44=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question45=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question46=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question47=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question48=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question49=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }   
        if(model.question50=="false"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question51=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question52=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question53=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question54=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question55=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question56=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        if(model.question57=="true"){
            modelScore.Waterfall = modelScore.Waterfall + ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + ;
            modelScore.RAD = modelScore.RAD + ;
            modelScore.Prototyping = modelScore.Prototyping + ;
            modelScore.Agile = modelScore.Agile + ;
        }
        */
        keysSorted = Object.keys(modelScore).sort(function(a,b){return modelScore[b]-modelScore[a]})
        $rootScope.option1 = keysSorted[0];
        $rootScope.option2 = keysSorted[1];
        $rootScope.option3 = keysSorted[2];
        $rootScope.option4 = keysSorted[3];
        $rootScope.option5 = keysSorted[4];
        $rootScope.score1 = modelScore[keysSorted[0]];
        $rootScope.score2 = modelScore[keysSorted[1]];
        $rootScope.score3 = modelScore[keysSorted[2]];
        $rootScope.score4 = modelScore[keysSorted[3]];
        $rootScope.score5 = modelScore[keysSorted[4]];
    }

})