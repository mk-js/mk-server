const { config, start } = require('mk-server');
const auth = require('mk-service-auth')

config({
    host: "localhost",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: ['services.auth.api.interceptor'],
    services: {
        auth, // apiRootUrl:false
        user: {
            api: {
                //  http://localhost:8000/v1/user/helloworld 
                login: ({ userName, password }, ctx) => ctx.setToken([100, 200, 300]).return(true),
                create: (dto, ctx) => dto,
                update: (dto, ctx) => [ctx.token.userId, ctx.token.orgId, ctx.token.versionId],
            },
        },
    },
    api: {
        helloworld: () => "hello world", // http://localhost:8000/v1/helloworld
    },
});

auth.config({
    key: "privateKeys",
    tokenKeys: ['userId', 'orgId', 'versionId'],
    exclude: ['/v1/user/login', '/v1/user/create', '/v1/helloworld'],
})

start();