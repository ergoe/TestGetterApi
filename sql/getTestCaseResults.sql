SELECT  TestCaseExecution.Id AS testCaseId
        , TestCaseExecution.CaseStartTime AS startTime
        , TestCaseExecution.CaseEndTime AS endTime
        , TestCaseExecution.CaseName AS caseName
        , TestCaseExecution.CaseResult AS result
        , TestCaseExecution.ExecutionNode AS executionNode
        , TestCaseExecution.ErrorMessage AS errorMessage
        , TestCaseExecution.TestClassExecution_id AS testClassExecutionId
        , TestCaseExecution.Browser AS browser
        , TestClassExecution.ClassName AS className
        , TestClassExecution.TestRun_id AS testRunId

FROM TestCaseExecution
INNER JOIN TestClassExecution ON TestCaseExecution.TestClassExecution_id = TestClassExecution.Id
--  LEFT JOIN TestFailInfo ON TestFailInfo.Id = TestCaseExecution.TestFailInfo_id
WHERE TestRun_id= @testRunId