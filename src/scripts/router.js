
( () => {

    const RouteConfig = ( $stateProvider, $urlRouterProvider ) => {


        $urlRouterProvider.otherwise( '/start' )


        $stateProvider
            .state( 'start', {
                url: '/start',
                templateUrl: '/resources/partials/graph.html',
                controller: 'd3Ctrl'
            } )


    }


    angular.module( 'exampleD3' )
    .config( RouteConfig )



} )()
