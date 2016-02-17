SELECT DISTINCT
          CaseResult
        , COUNT(CaseResult)
FROM TestCaseExecution
INNER JOIN TestClassExecution ON TestCaseExecution.TestClassExecution_id = TestClassExecution.Id
WHERE TestClassExecution.TestRun_id = @testRun
GROUP BY CaseResult