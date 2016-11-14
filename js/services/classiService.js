app.service('ClassiService', [ '$http', 'URL', function( $http, URL ){

    var onError = function (response){
        console.log("Errore di chiamata: ", response)
    };

    var getClasse = function(request, onReady){
        var data = request? request.data : {};
        $http({
            url : URL.REST + '/classi.json',
            method : "GET",
            data : data,
            dataType : "json"
        }).then(onReady, onError);
    }

    return {
        getClasse : getClasse
    };
}]);