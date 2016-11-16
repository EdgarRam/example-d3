/**
    ** Module dependencies.
**/
const express = require( 'express' )
const app = express()
const http = require( 'http' ).Server(app)
// const favicon = require( 'serve-favicon' )
const morgan = require( 'morgan' )
const bodyParser = require ( 'body-parser' )
const methodOverride = require( 'method-override' )
const path = require( 'path' )


const port = process.env.PORT || 3000



//init middleware
// app.use(favicon(__dirname + '/public/favicon.ico'))
app.use( morgan( 'combined' ) ) //trazas
//app.set( 'port', port )
app.use( bodyParser.json() )
app.use( methodOverride() )
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( '/resources', express.static( path.join( __dirname, '/dist') ) )


// development only
if ('development' == app.get( 'env' ) ) {
    app.use( ( err, req, res, next ) => {
        if ( res.headersSent ) {
            return next(err)
        }
        res.status( err.status || 500 )
        res.send({
            message: err.message,
            error: err
        })
    })
}



//init routes
app.get( '/', (req, res) => res.sendFile( 'index.html', { root: `${__dirname}/dist` }) )




http.listen( port, '0.0.0.0' )
console.log('The magic happens on port ' + port)
