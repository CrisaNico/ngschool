app.controller('PersoneController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
    var vm = $scope;
	vm.id= $routeParams && $routeParams.id || false; // Dichiaro il routeParams per l'id per il crudService che serve ad indicare che id uso nel DB '
    vm.data = [];
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		if (vm.id) vm.d=vm.data[0] || {};
    }
	/*La function populateData prende il JSON dal database e va a popolare
	il form nella pagina di persone.html*/
    vm.read = function(){
		var fnd={"cat":"persone"};
		if (vm.id) fnd._id=vm.id;
        crudService.fnd(fnd, populateData);
    };
	/*La function read cosa fa? In pratica
	legge quello che c'è nel db e poi tramite il crudService
	va a popolare il form su persone.html . La var fnd viene definita
	nel crudService (leggere commento nel relativo file)*/	
    vm.save = function(){
		vm.d.cat='persone';
		if (vm.id=='new') delete(vm.id)
        crudService.set(vm.d,function(r){
			if (!vm.id){
				window.location="#/persone/"+r.id
			}
		});
    };
	/* La function save controlla intanto guarda se l'id corrisponde a quello
	della fucntion fnd in crudService. Controlla se l'id inserito è nuovo viene richiamta
	la function set del crudService. Se è diverso al metodo nuovo viene ritornata alla 
	pagina personale.*/
	vm.remove = function(){
        crudService.del(vm.d,function(r){
			window.location="#/persone/"
		});
    };
	/*La function remove semplicemente rimuove un utente nel form.*/
    vm.init = function(){
        vm.read();
		var pr=function(){
			$('[ng-model="cognome"]').focus()
		}
		$(pr)
    };	
	vm.init();
}]);


/* TODO:

autofocus
notifiche 
pulsanti salva, elimina eccetera quando necessario

*/