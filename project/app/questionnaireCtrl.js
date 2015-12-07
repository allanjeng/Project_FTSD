app.controller('questionnaireCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $log) {
    
  // $scope.id = $routeParams.id
    $scope.form = {};
    $scope.steps = [{
        title:"Questionnaire",
        active:true,
        visited:true
    },{
        title:"Select Model",
        active:false,
        visited:false
    }];

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
    $scope.models = ['Waterfall', "Optimized Waterfall", 'RAD', 'Agile', "Prototyping", "Spiral"]
    $scope.updateModel = function(){
        var r = confirm("Are you sure?");
        if(r==true){
            var choice = document.getElementById("choice");
            var selected = choice.options[choice.selectedIndex].text;

            Data.post('updateModel', {
                projectModel: selected,
                projectId: $rootScope.projectID
            }).then(function (results) {
                Data.toast(results);
            });
            $location.path( "/dashboard" );   
        }else{
            x="canceled.";
        }
    }
    
    $scope.calculatePoints = function(model){

        var modelScore = {"Waterfall" : 0, "Optimized_Waterfall" : 0,"RAD" : 0, "Prototyping" : 0, "Agile" : 0, "Spiral" : 0};
        if(model.numTeamMem>10)
        {
        	modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }else{
        	modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.budget>10000)
        {
        	modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }else{
        	modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.timeSpan>12)
        {
        	modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }else
        {
        	modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question1=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question2=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0;
            modelScore.RAD = modelScore.RAD + 0;
            modelScore.Prototyping = modelScore.Prototyping + 0;
            modelScore.Agile = modelScore.Agile + 0;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question3=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 0;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question4=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 3;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question5=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question6=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 3;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question7=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question8=="true"){
            modelScore.Waterfall = modelScore.Waterfall - 2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall - 2;
            modelScore.RAD = modelScore.RAD - 1;
            modelScore.Prototyping = modelScore.Prototyping - 1;
            modelScore.Agile = modelScore.Agile - 1;
            modelScore.Spiral = modelScore.Spiral - 1 ;
        }
        if(model.question9=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        
        if(model.question10=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0;
            modelScore.RAD = modelScore.RAD + 0;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question11=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1 ;
            modelScore.RAD = modelScore.RAD + 2 ;
            modelScore.Prototyping = modelScore.Prototyping + 1 ;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral +  2 ;
        }
        if(model.question12=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 2 ;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 1  ;
        }
        if(model.question13=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2 ;
            modelScore.RAD = modelScore.RAD + 2 ;
            modelScore.Prototyping = modelScore.Prototyping + 2 ;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 2  ;
        }
        if(model.question14=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD + 0 ;
            modelScore.Prototyping = modelScore.Prototyping + 1 ;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question15=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 2 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2 ;
            modelScore.RAD = modelScore.RAD + 2 ;
            modelScore.Prototyping = modelScore.Prototyping + 1 ;
            modelScore.Agile = modelScore.Agile + 1 ;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question16=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1 ;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 2 ;
            modelScore.Agile = modelScore.Agile + 1 ;
            modelScore.Spiral = modelScore.Spiral + 0 ;
        }
        if(model.question17=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1 ;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 2 ;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 2  ;
        }
        if(model.question18=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 1 ;
            modelScore.Agile = modelScore.Agile + 1 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question19=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question20=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 1;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question21=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD + 1 ;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question22=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD +0 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question23=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD +0 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question24=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0 ;
            modelScore.RAD = modelScore.RAD +0 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question25=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 0;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question26=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question27=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question28=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }

        if(model.question29=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question30=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 3;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question31=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question32=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question33=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question34=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question35=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question36=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 3;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question37=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question38=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }

        if(model.question39=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question40=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question41=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question42=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +0 ;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +2 ;
            modelScore.Agile = modelScore.Agile +2 ;
            modelScore.Spiral = modelScore.Spiral + 1 ;
        }
        if(model.question43=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question44=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +2 ;
            modelScore.RAD = modelScore.RAD +1 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question45=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question46=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +2 ;
            modelScore.RAD = modelScore.RAD +1 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question47=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question48=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question49=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }   
        if(model.question50=="false"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question51=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question52=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2 ;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 3;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question53=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 0;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +1 ;
            modelScore.RAD = modelScore.RAD + 2;
            modelScore.Prototyping = modelScore.Prototyping + 1;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question54=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +2 ;
            modelScore.RAD = modelScore.RAD +1 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        if(model.question55=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 3;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 2;
            modelScore.RAD = modelScore.RAD + 1;
            modelScore.Prototyping = modelScore.Prototyping + 2;
            modelScore.Agile = modelScore.Agile + 3;
            modelScore.Spiral = modelScore.Spiral +  2;
        }
        if(model.question56=="true"){
            modelScore.Waterfall = modelScore.Waterfall + 1;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall + 1;
            modelScore.RAD = modelScore.RAD +2 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile + 2;
            modelScore.Spiral = modelScore.Spiral + 2 ;
        }
        if(model.question57=="true"){
            modelScore.Waterfall = modelScore.Waterfall +2;
            modelScore.Optimized_Waterfall = modelScore.Optimized_Waterfall +2 ;
            modelScore.RAD = modelScore.RAD +1 ;
            modelScore.Prototyping = modelScore.Prototyping +1 ;
            modelScore.Agile = modelScore.Agile +1 ;
            modelScore.Spiral = modelScore.Spiral +  1;
        }
        
        keysSorted = Object.keys(modelScore).sort(function(a,b){return modelScore[b]-modelScore[a]})
        $rootScope.option1 = keysSorted[0];
        $rootScope.option2 = keysSorted[1];
        $rootScope.option3 = keysSorted[2];
        $rootScope.option4 = keysSorted[3];
        $rootScope.option5 = keysSorted[4];
        $rootScope.option6 = keysSorted[5];
        $rootScope.score1 = modelScore[keysSorted[0]];
        $rootScope.score2 = modelScore[keysSorted[1]];
        $rootScope.score3 = modelScore[keysSorted[2]];
        $rootScope.score4 = modelScore[keysSorted[3]];
        $rootScope.score5 = modelScore[keysSorted[4]];
        $rootScope.score6 = modelScore[keysSorted[5]];
    }

})