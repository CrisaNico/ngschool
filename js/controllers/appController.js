app.controller('AppController', ['swInfo', function( swInfo ) {
    var vm = this;
    vm.nav = [
       {
        url:"#/",
        title:"Home"
       },{
        url:"#/persone",
        title:"Persone"
       },{
        url:"#/opzioni",
        title:"Opzioni"
       }
    ];
    vm.ver = swInfo.version;
    vm.today = new Date();
}]);
