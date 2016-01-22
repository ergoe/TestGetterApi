SELECT      * 
FROM        TestCaseExecution
INNER JOIN  TestClassExecution 
    on TestCaseExecution.TestClassExecution_id = TestClassExecution.Id
WHERE
            TestRun_id = @testRunId 