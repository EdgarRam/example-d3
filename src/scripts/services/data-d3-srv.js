( () => {


	const bookListSrv = () => {

        var bookList = []
        const api = {}

        const generateData = () =>{

            for (var i = 0; i < 100; i++){
                let day = parseInt( Math.random() * 28 ) + 1
                let hour = parseInt(Math.random() * 24)
                let minute =parseInt(Math.random() * 60)
                let newDate = new Date(2015, 2, day )

                bookList.push( {
                    x: newDate.getTime(),
                    y: parseInt( Math.random() * 100  + 1 )
                } )
            }
        }

        generateData()

        api.getBooks = () => bookList

        return api

	}


    angular.module( 'exampleD3.services' )
		.service( 'bookListSrv', bookListSrv )
} )()
