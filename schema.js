var sql = require( "seriate" );
var when = require( "when" );

// var getAllTables = function() {
//     return sql.execute ({
//         query: sql.fromFile( "./sql/getAllTables" )
//     });
// };

var getAllCurrentRuns = function( qaEnvironment, buildName, executionHost ) {
    console.log("BuildName Schema: " + buildName);
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestRuns" ),
        params: {
            buildName: {
                type: sql.NVARCHAR,
                val: buildName
            },
            qaEnvironment: {
                type: sql.NVARCHAR,
                val: qaEnvironment
            },
            executionHost: {
                type: sql.NVARCHAR,
                val: executionHost
            }
        }
    });
};

var getTestClassExecution = function( testRunId ) {
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestClassExecution" ),
        params: {
            testRunId: {
                type: sql.BIGINT,
                val: testRunId
            }
        }
    });
};

var getTestCaseResultsWithTestTags = function( testRunId, testResult, testTags ) {
    console.log("testTags: " + testTags);
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestCaseResultsWithTags" ),
        params: {
            testRunId: {
                type: sql.BIGINT,
                val: testRunId
            },
            testResult: {
                type: sql.NVARCHAR,
                val: testResult
            },
            testTags: {
                type: sql.NVARCHAR,
                val: testTags
            }
        }
    });
};

// start of new getTestResults that will handle tags and return items with specified tags
var getTestCaseResults = function( testRunId, testResult, testTags ) {
    return when.promise( function ( resolve, reject ) {
        
        sql.getPlainContext()
            .step( "getTestResults", function( execute, data ) {
                execute( {
                    query: sql.fromFile( "./sql/getTestCaseResultsWithTags" ),
                    params: {
                        testRunId: {
                            type: sql.BIGINT,
                            val: testRunId
                        },
                        testResult: {
                            type: sql.NVARCHAR,
                            val: testResult
                        },
                        testTags: {
                            type: sql.NVARCHAR,
                            val: testTags
                        }
                    }
                });
            })
            .end( function( sets ){ 
                var testingResults = sets.getTestResults;
                var newTestingResults = [];
                var trimmedTestTags = testTags.trim(testTags);
                console.log("****" + trimmedTestTags + "****")
                console.log("Testing tags passed in: " + trimmedTestTags);
                
                for (var i = 0; i < testingResults.length; i++) {
                    //if (testingResults[i].result === testResult) {
                        if (trimmedTestTags) {
                            if(testingResults[i].tags !== null) {
                                console.log("TestingResult Tags: " + testingResults[i].tags);
                                var subTags = trimmedTestTags.split(' ').sort();
                                var superTags = testingResults[i].tags.split(' ').sort();
                                if (superTags.containsArray(subTags)) {
                                    newTestingResults.push(testingResults[i]);
                                }
                            }
                        } else {
                            console.log("Entering else: ");
                            newTestingResults.push(testingResults[i]);
                        }
                        
                        
                        if (!subTags) {
                            // console.log("No subtags passed");
                            
                        } else { 
                            // console.log("subtags passed");
                            
                        }
                    
                }           
                resolve(newTestingResults);
            })
            .error( function( err ) {
                
            });
    });
};

var getTestCaseResultsNoTestTags = function( testRunId, testResult) {
    //console.log("testTags: " + testTags);
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestCaseResultsNoTestTags" ),
        params: {
            testRunId: {
                type: sql.BIGINT,
                val: testRunId
            },
            testResult: {
                type: sql.NVARCHAR,
                val: testResult
            }
        }
    });
};

var getTestCaseLog = function( testId ) {
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestCaseLog" ),
        params: {
            testId: {
                type: sql.BIGINT,
                val: testId
            }
        }
    });
};

var getTestCaseHistory = function( testName ) {
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestCaseHistory" ),
        params: {
            testName: {
                type: sql.NVARCHAR,
                val: testName
            }
        }
    });
};

var getTestRunResults = function( testRun ) {
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestRunResults" ),
        params: {
            testRun: {
                type: sql.NVARCHAR,
                val: testRun
            }
        }
    });
};

function checkTagsSuperset( superSet, subSet) {
        return superSet.toString().indexOf( subSet.toString() ) > -1
}

Array.prototype.containsArray = function ( array /*, index, last*/ ) {

    if( arguments[1] ) {
        var index = arguments[1], last = arguments[2];
    } else {
        var index = 0, last = 0; this.sort(); array.sort();
    };

    return index == array.length
        || ( last = this.indexOf( array[index], last ) ) > -1
        && this.containsArray( array, ++index, ++last );

};

module.exports = {
    getAllCurrentRuns: getAllCurrentRuns,
    getTestClassExecution: getTestClassExecution,
    getTestCaseResultsWithTestTags: getTestCaseResultsWithTestTags,
    getTestCaseLog: getTestCaseLog,
    getTestCaseHistory: getTestCaseHistory,
    getTestRunResults: getTestRunResults,
    getTestCaseResultsNoTestTags: getTestCaseResultsNoTestTags,
    getTestCaseResults: getTestCaseResults
};