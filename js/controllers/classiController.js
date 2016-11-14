app.controller('ClassiController',['$scope','ClassiService','$http', function($scope,ClassiService,$http) {
    var vm = $scope;

    vm.classe = [];
    vm.classi = {};

    vm.init = function(){
        vm.resetClasse();
        vm.resetClassi();
    };

    var populateClasse = function(response) {
        var classe = response.data.result.classe;
        vm.classe.length = 0;
        for(var i = 0; i < classe.length; i++){
            vm.classe.push(classe[i]);
        }
    }

    vm.resetClasse = function(){
        ClassiService.getClasse(null, populateClasse);
    };

    vm.resetClassi = function(){
        vm.classi.anno = new Date();
        vm.classi.nomesez = '';
        vm.classi.teacher = '';
        vm.classi.index = -1;
    };

    vm.getClassi = function(s){
        var classi = {};
        classi.anno = s.anno;
        classi.nomesez = s.nomesez;
        classi.teacher = s.teacher;
        return classi;
    };

    vm.saveClassi = function(index){
        if(index >= 0){
            vm.classe.splice(index, 1, vm.getClassi(vm.classi));
        } else{
            vm.classe.push(vm.getClassi(vm.classi));
            vm.resetClassi();
        }
    };

    vm.showClassi = function(index){
        vm.clasi = vm.getClassi(vm.classe[index]);
        vm.student.index = index;
    };

    vm.deleteClassi = function(index) {
        if(vm.classi.index == index)
            vm.resetClassi();
        vm.classe.splice(index,1); 
    };

    vm.init();

}]);