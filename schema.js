var sql = require( "seriate" );

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

var getTestCaseResults = function( testRunId, testResult ) {
    return sql.execute ({
        query: sql.fromFile( "./sql/getTestCaseResults" ),
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

module.exports = {
    getAllCurrentRuns: getAllCurrentRuns,
    getTestClassExecution: getTestClassExecution,
    getTestCaseResults: getTestCaseResults,
    getTestCaseLog: getTestCaseLog,
    getTestCaseHistory: getTestCaseHistory,
    getTestRunResults: getTestRunResults
};