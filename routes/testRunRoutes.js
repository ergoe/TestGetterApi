var sql = require("seriate");
var schema = require("../schema");

var config = {
    user: "<user>",
    password: "<password>",
    server: "<server>",
    database: "<database>"
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
        
        var executionHost = null;
        if (req.query.host) {
            executionHost = req.query.host;
            console.log(executionHost);
        } else {
            executionHost = 'bba048';
        } 
        
        
        schema.getAllCurrentRuns( qaEnvironment, buildName, executionHost)
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
        
        var testResult = null;
        if (req.query.result) {
            testResult = req.query.result
        } else {
            testResult = '%';
        }
        
        var testTags = null;
        if (req.query.tags) {
            console.log("Enter if of TestTags: " + 'TestCaseExecution.Description LIKE  ' + req.query.tags);
            
            testTags = req.query.tags;
            
        } else {
            console.log("Enter else of TestTags:")
        }
        
        if (testTags) {
            schema.getTestCaseResultsWithTestTags( testRunId, testResult, testTags )
                .then( function ( results ) {
                    console.log("Your Mum: " + testTags);
                    res.setHeader('Content-Type', 'application/json')
                    res.json(results);
                }, function( err ) {
                    console.log( "Something bad happened: ", err);
                });
        } else {
            schema.getTestCaseResultsNoTestTags( testRunId, testResult, testTags )
            .then( function ( results ) {
                console.log("No Test Tags: " + testTags);
                res.setHeader('Content-Type', 'application/json')
                res.json(results);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
        }
    })
    
    app.get("/testCaseResults1", function( req, res ) {
        var testRunId = null;
        if (req.query.testRunId) {
            testRunId = req.query.testRunId;
        } else {
            testRunId = '%';
        }
        
        var testResult = null;
        if (req.query.result) {
            testResult = req.query.result
        } else {
            testResult = '%';
        }
        
        var testTags = null;
        if (req.query.tags) {
            testTags = req.query.tags
        } else {
            testTags = '';
        }
            
        schema.getTestCaseResults( testRunId, testResult, testTags )
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
    
    app.get("/testCaseHistory", function( req, res ) {
        var testCaseName = null;
        if (req.query.testName) {
            testCaseName = req.query.testName;
            console.log("TestCaseName: " + testCaseName);
        } else {
            testCaseName = '%';
        }
        
        schema.getTestCaseHistory( testCaseName )
            .then( function ( results ) {
                res.setHeader('Content-Type', 'application/json')
                res.json(results);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
    })
    
    app.get("/testRunResults", function( req, res ) {
        console.log("Entering testRunResults");
        var testRunId= null;
        if (req.query.testRun) {
            testRunId = req.query.testRun;
            console.log("TestRunId: " + testRunId);
        } else {
            testRunId = '%';
        }
        
        schema.getTestRunResults ( testRunId )
            .then( function ( results ) {
                res.setHeader('Content-Type', 'application/json')
                var newObject = {};
                var resultKey = "";
                for (var j = 0; j < results.length; j++) {
                    resultKey = results[j].result;
                    newObject[resultKey] = results[j].count;
                }
                res.json(newObject);
            }, function( err ) {
                console.log( "Something bad happened: ", err);
            });
    })
}

module.exports = appRouter;