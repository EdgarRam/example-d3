(() => {

    angular.module( 'exampleD3.controllers', [] );
    angular.module( 'exampleD3.services', [] );


    angular.module( 'exampleD3',  [
        'exampleD3.controllers',
        'exampleD3.services',
        'ui.router',
        'nvd3'
    ] )


})()
