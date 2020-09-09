SELECT DISTINCT
          CaseResult AS result
        , COUNT(CaseResult) AS count
FROM TestCaseExecution
INNER JOIN TestClassExecution ON TestCaseExecution.TestClassExecution_id = TestClassExecution.Id
WHERE TestClassExecution.TestRun_id = @testRun
GROUP BY CaseResult