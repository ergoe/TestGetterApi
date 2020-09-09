SELECT  TestCaseExecution.Id AS testCaseId
        , TestCaseExecution.CaseStartTime AS startTime
        , TestCaseExecution.CaseEndTime AS endTime
        , TestCaseExecution.CaseName AS caseName
        , TestCaseExecution.CaseResult AS result
        , TestCaseExecution.ExecutionNode AS executionNode
        , TestCaseExecution.ErrorMessage AS errorMessage
        , TestCaseExecution.TestClassExecution_id AS testClassExecutionId
        , TestCaseExecution.Browser AS browser
        , TestCaseExecution.Description AS tags
        , TestClassExecution.ClassName AS className
        , TestClassExecution.TestRun_id AS testRunId
        , TestRun.Environment AS environment

FROM TestCaseExecution
INNER JOIN TestClassExecution ON TestCaseExecution.TestClassExecution_id = TestClassExecution.Id
INNER JOIN TestRun ON TestRun.Id = TestClassExecution.TestRun_id
--  LEFT JOIN TestFailInfo ON TestFailInfo.Id = TestCaseExecution.TestFailInfo_id
-- WHERE TestRun_id= @testRunId AND TestCaseExecution.CaseResult LIKE '%' + @testResult + '%' AND TestCaseExecution.Description LIKE @testTags
--WHERE TestRun_id= @testRunId AND TestCaseExecution.CaseResult LIKE '%' + @testResult + '%' AND @testTags
WHERE TestRun_id= @testRunId AND TestCaseExecution.CaseResult LIKE '%' + @testResult --+ '%' AND (TestCaseExecution.Description IS NOT null OR TestCaseExecution.Description = '')