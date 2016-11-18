app.controller('PersoneController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
    var vm = $scope;
	window.vm=vm;
	vm.id= $routeParams && $routeParams.id || false;
    vm.data = [];
	vm.gridEmailsOptions={
		columnDefs:[
			{ name: 'email'},
			{ name: 'note' }
		],
		enableCellEditOnFocus: true,
		enableRowSelection: true,
		selectionRowHeaderWidth: 35,
		enableSelectAll: true,
		multiSelect:true,
		onRegisterApi:function(gridApi){
			vm.gridEmailsApi = gridApi;
		}		
	};
	vm.gridAdressOptionss={
		columDefs:[
			{name: "indirizzo"},
			{name: "comune"},
			{name: "provincia"},
			{name: "cap"},
			{name: "telefono"}
		],
		enableCellEditOnFocus: true,
		enableRowSelection: true,
		selectionRowHeaderWidth: 35,
		enableSelectAll: true,
		multiSelect:true,
		onRegisterApi:function(gridApi){
			vm.gridAdressApi = gridApi;
		}
	};
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		if (vm.id){
			vm.d=vm.data[0] || {};
			vm.gridEmailsOptions.data=vm.d.emails;
			vm.gridAdressOptions.data=vm.d.adress;
		}
		
    };
	vm.createEmail=function(){
		vm.d.emails.push({})
	};
	vm.createAdress=function(){
		vm.d.adress.push({})
	};
	vm.removeEmail = function(){	
		//var d=vm.gridEmailsApi.grid.selection.lastSelectedRow.entity
		console.log(vm.gridEmailsApi.grid)
		var rws=vm.gridEmailsApi.grid.selection.getSelectedRows();
		rws.map(function(d){
			vm.d.emails.splice(vm.d.emails.indexOf(d),1)
		})
		
    };
	vm.removeAdress = function(){
		//var d=vm.gridAdressApi.grid.selection.lastSelectedRow.entity
		console.log(vm.gridAdressApi.grid)
		var rws=vm.gridAdressApi.grid.selection.getSelectedRows();
		rws.map(function(d){
			vm.d.adress.splice(vm.d.adress.indexOf(d),1)
		})
	};	
    vm.read = function(){
		var fnd={"cat":"persone"};
		if (vm.id) fnd._id=vm.id;
        crudService.fnd(fnd, populateData);
    };	
    vm.save = function(){
		vm.d.cat='persone';
		if (vm.id=='new') delete(vm.id)
        crudService.set(vm.d,function(r){
			if (!vm.id){
				window.location="#/persone/"+r.id
			}
		});
    };
	vm.remove = function(){
        crudService.del(vm.d,function(r){
			window.location="#/persone/"
		});
    };
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