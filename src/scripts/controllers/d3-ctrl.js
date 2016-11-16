( () => {


	const d3Ctrl = ( $scope, bookListSrv ) =>{

        const Books = bookListSrv.getBooks()


        const setup = () => {
            setBasicGraph()
            setAdvanceGraph()
        }


        const setBasicGraph = () =>{
            $scope.options = {
                "chart": {
                    "type": "historicalBarChart",
                    "height": 450,
                    "margin": {
                        "top": 20,
                        "right": 20,
                        "bottom": 60,
                        "left": 40
                    },
                    "duration": 500,
                    "useInteractiveGuideline": true,
                    "xAxis": {
                        "axisLabel": "Dates",
                        tickFormat: (d) =>
                            d3.time.format('%x')(new Date(d))
                    },
                    "yAxis": {
                        "axisLabel": "Sales",
                    }
                }
            }


            $scope.data = [{
                    values: Books,
                    key: 'Book',
                    color: '#ff7f0e'
            }]
        }

        const setAdvanceGraph = () =>{
            let dataGroup = getDataGroup()

            $scope.options2 ={
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: (d) => d.key,
                    y: (d) => d.y,
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            }


            $scope.data2 = [{
                    y: dataGroup.firstWeek.y,
                    key: 'First week',
                    color: '#ff0000'
                },
                {
                    y: dataGroup.twoWeek.y,
                    key: 'Second week',
                    color: '#007f0e'
                },
                {
                    y: dataGroup.threeWeek.y,
                    key: 'Three week',
                    color: '#0000de'
                },
                {
                    y: dataGroup.fourWeek.y,
                    key: 'Four week',
                    color: '#1f4f0e'
            }]
        }


        const getDataGroup = () =>{
            let firstWeek = new Date(2015, 2, 1 )
            let twoWeek = new Date(2015, 2,  7)
            let threeWeek = new Date(2015, 2, 14 )
            let fourWeek = new Date(2015, 2, 21 )

            let arrayAux = {
                firstWeek : {
                    x: firstWeek.getTime(),
                    y: 0
                },
                twoWeek   : {
                    x: twoWeek.getTime(),
                    y: 0
                },
                threeWeek : {
                    x: threeWeek.getTime(),
                    y:0
                },
                fourWeek  : {
                    x: fourWeek.getTime(),
                    y:0
                }
            }

            angular.forEach( Books, (value, key) => {
                if( value.x < twoWeek.getTime() ){
                    arrayAux.firstWeek.y += value.y
                }
                else if ( value.x < threeWeek.getTime() ) {
                    arrayAux.twoWeek.y += value.y
                }
                else if ( value.x < fourWeek.getTime() ) {
                    arrayAux.threeWeek.y += value.y
                }
                else {
                    arrayAux.fourWeek.y += value.y
                }
            })

            return arrayAux
        }


		setup()
	}


    angular.module( 'exampleD3.controllers' )
		.controller( 'd3Ctrl', d3Ctrl )
} )()
