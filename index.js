var sql = require("seriate");
var schema = require("./schema");

var config = {
    user: "eric.goeckeritz",
    password: "P@rkerleif961",
    server: "boisql203",
    domain: "BODY",
    database: "Lumberjack"
};

sql.setDefaultConfig( config );

// schema.getAllTables()
//     .then( function( results ) {
        
//         console.log( results );
//     }, function( err ) {
//         console.log( "Something bad happened: ", err);
//     });
var qaEnvironment = "stage";    
schema.getAllCurrentRuns( qaEnvironment, "")
    .then( function( results ) {
        
        console.log( results );
    }, function( err ) {
        console.log( "Something bad happened: ", err);
    });