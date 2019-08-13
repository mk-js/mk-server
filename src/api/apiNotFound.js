module.exports = (apiRootUrl, routes, services) => {
    apiNotFound(apiRootUrl, apiRootUrl + '/notFound', routes)
    apiNotFound('', apiRootUrl + '/notFoundAll', routes)

    return routes;
}
function apiNotFound(apiRootUrl, apiNotFound, routes){
  
    var router = routes.filter(r=>r.path == apiNotFound)[0]
    if(router){ 
        console.log("api 404 path: " + apiRootUrl + '/{p*}'); 
        routes.push({
            method: 'POST',
            path: apiRootUrl + '/{p*}',
            config: router.config
        }); 
    }
    return routes;
}
