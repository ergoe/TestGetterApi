var sql = require("seriate");
var schema = require("../schema");

var config = {
    user: "",
    password: "",
    server: "boisql203",
    domain: "BODY",
    database: "Lumberjack"
};

sql.setDefaultConfig( config );

var appRouter = function(app) {
    
    app.get("/", function(req, res) {
        
        var qaEnvironment = null;
        if (req.query.env) {
            qaEnvironment = req.query.env;
        } else {
            qaEnvironment = '%';
        } 
        
        var buildName = null;
        if (req.query.build) {
            buildName = req.query.build;
        } else {
            buildName = '%';
        } 
        
        schema.getAllCurrentRuns( qaEnvironment, buildName)
            .then( function( results ) {
        res.setHeader('Content-Type', 'application/json')
        res.json(results);
        }, function( err ) {
            console.log( "Something bad happened: ", err);
        });
        
    });
    
    app.get("/testClass", function( req, res) {
        var testRunId = null;
        if (req.query.testRunId) {
            testRunId = req.query.testRunId;
        } else {
            testRunId = '%';
        }
        
        schema.getTestClassExecution( testRunId )
            .then( function ( results ) {
                res.setHeader('Content-Type', 'application/json')
                res.json(results);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
    });
    
    app.get("/testCaseResults", function( req, res ) {
        var testRunId = null;
        if (req.query.testRunId) {
            testRunId = req.query.testRunId;
        } else {
            testRunId = '%';
        }
        
        schema.getTestCaseResults( testRunId )
            .then( function ( results ) {
                res.setHeader('Content-Type', 'application/json')
                res.json(results);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
    })
    
    app.get("/testCaseLog", function( req, res ) {
        var testCaseId = null;
        if (req.query.testId) {
            testCaseId = req.query.testId;
        } else {
            testCaseId = '%';
        }
        
        schema.getTestCaseLog( testCaseId )
            .then( function ( results ) {
                res.setHeader('Content-Type', 'application/json')
                res.json(results);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
    })
}

module.exports = appRouter;